import { Effect } from "effect";

import {
  permissionedResolverV2InterfaceGetAliasAbi,
  resolverInterfaceIds,
} from "@ensforge/contracts/v2";

import { defineReadAction } from "../../../action/read-request.js";
import type { EnsforgeConfig } from "../../../config/config.js";
import { CodecError } from "../../../errors/codec-error.js";
import { supportsInterface } from "../../../internal/capabilities/interface-support.js";
import { EthereumClient } from "../../../internal/client/ethereum-client.js";
import { executeRead } from "../../../internal/read/execute-read.js";
import { dnsDecodeName, dnsEncodeName } from "../../../names/dns.js";
import { normalizeName } from "../../../names/normalize.js";
import { findResolver } from "../get-resolver/find.js";
import type { AliasResult, GetAliasError, GetAliasParameters } from "./types.js";

const getAliasEffect = Effect.fn("ensforge.getAlias")(function* (
  config: EnsforgeConfig,
  parameters: GetAliasParameters,
) {
  const name = yield* normalizeName.effect(parameters.name);
  return yield* executeRead(
    config,
    parameters,
    Effect.gen(function* () {
      const discovery = yield* findResolver(name);
      if (discovery === null) {
        return {
          supported: false,
          name,
          resolver: null,
          reason: "RESOLVER_NOT_FOUND",
        } as const satisfies AliasResult;
      }
      const permissioned = yield* supportsInterface(
        discovery.address,
        resolverInterfaceIds.permissionedResolver,
      );
      if (!permissioned) {
        return {
          supported: false,
          name,
          resolver: discovery.address,
          reason: "ALIASING_UNSUPPORTED",
        } as const satisfies AliasResult;
      }
      const ethereum = yield* EthereumClient;
      const raw = yield* ethereum.readContract({
        address: discovery.address,
        abi: permissionedResolverV2InterfaceGetAliasAbi,
        functionName: "getAlias",
        args: [yield* dnsEncodeName.effect(name)],
      });
      const target =
        raw === "0x"
          ? null
          : yield* Effect.try({
              try: () => dnsDecodeName(raw),
              catch: (cause) =>
                cause instanceof CodecError
                  ? cause
                  : new CodecError({
                      code: "INVALID_DNS_NAME",
                      message: `Unable to decode the resolver alias for ${name}`,
                    }),
            });
      return {
        supported: true,
        name,
        resolver: discovery.address,
        target,
        raw,
      } as const satisfies AliasResult;
    }),
  );
});

export const getAlias = defineReadAction<GetAliasParameters, AliasResult, GetAliasError>(
  getAliasEffect,
);

export { AliasResult, type GetAliasError, type GetAliasParameters } from "./types.js";
