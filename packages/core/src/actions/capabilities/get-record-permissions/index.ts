import { Effect } from "effect";

import { publicResolverV1Abi } from "@ensforge/contracts/v1";
import { permissionedResolverV2InterfaceAbi, resolverInterfaceIds } from "@ensforge/contracts/v2";

import { defineReadAction } from "../../../action/read-request.js";
import type { EnsforgeConfig } from "../../../config/config.js";
import { supportsInterface } from "../../../internal/capabilities/interface-support.js";
import {
  resolverRecordPart,
  resolverRecordRole,
  resolverResource,
} from "../../../internal/capabilities/resolver-resource.js";
import { EthereumClient } from "../../../internal/client/ethereum-client.js";
import { executeRead } from "../../../internal/read/execute-read.js";
import { namehash } from "../../../names/hashes.js";
import { normalizeName } from "../../../names/normalize.js";
import type { EthereumAddress } from "../../../schemas/identity.js";
import { getManager } from "../../name/get-manager/index.js";
import { getResolverCapabilities } from "../get-resolver-capabilities/index.js";
import type {
  CapabilityError,
  NameCapabilityParameters,
  RecordOperation,
  RecordPermission,
  RecordPermissionsResult,
  ResolverProfiles,
} from "../types.js";

export type GetRecordPermissionsParameters = NameCapabilityParameters & {
  readonly account: EthereumAddress;
  readonly records: ReadonlyArray<RecordOperation>;
};

const profileSupported = (profiles: ResolverProfiles, record: RecordOperation): boolean => {
  switch (record.type) {
    case "address":
      return profiles.address;
    case "text":
      return profiles.text;
    case "contentHash":
      return profiles.contentHash;
    case "abi":
      return profiles.abi;
    case "pubkey":
      return profiles.pubkey;
    case "interface":
      return profiles.interface;
    case "name":
      return profiles.name;
    case "data":
      return profiles.data;
    case "clear":
      return true;
  }
};

const getRecordPermissionsEffect = Effect.fn("ensforge.getRecordPermissions")(function* (
  config: EnsforgeConfig,
  parameters: GetRecordPermissionsParameters,
) {
  const name = yield* normalizeName.effect(parameters.name);
  return yield* executeRead(
    config,
    parameters,
    Effect.gen(function* () {
      const [resolver, manager] = yield* Effect.all(
        [
          getResolverCapabilities.effect(config, parameters),
          getManager.effect(config, parameters),
        ] as const,
        { concurrency: "unbounded" },
      );
      if (resolver.address === null) {
        return {
          resolver: null,
          inherited: false,
          account: parameters.account,
          records: parameters.records.map((record): RecordPermission => ({
            record,
            supported: false,
            authorized: false,
            source: "none",
            requiredRole: resolverRecordRole(record),
            resource: null,
          })),
        } satisfies RecordPermissionsResult;
      }

      const ethereum = yield* EthereumClient;
      const resolverAddress = resolver.address;
      const permissioned = yield* supportsInterface(
        resolverAddress,
        resolverInterfaceIds.permissionedResolver,
      );
      let ownerAuthorized = false;
      let operatorAuthorized = false;
      let delegateAuthorized = false;
      if (!permissioned && manager !== null) {
        ownerAuthorized = manager.toLowerCase() === parameters.account.toLowerCase();
        [operatorAuthorized, delegateAuthorized] = yield* Effect.all(
          [
            ethereum
              .readContract({
                address: resolverAddress,
                abi: publicResolverV1Abi,
                functionName: "isApprovedForAll",
                args: [manager, parameters.account],
              })
              .pipe(Effect.catchTag("ContractError", () => Effect.succeed(false))),
            ethereum
              .readContract({
                address: resolverAddress,
                abi: publicResolverV1Abi,
                functionName: "isApprovedFor",
                args: [manager, namehash(name), parameters.account],
              })
              .pipe(Effect.catchTag("ContractError", () => Effect.succeed(false))),
          ] as const,
          { concurrency: "unbounded" },
        );
      }

      const records = yield* Effect.forEach(
        parameters.records,
        Effect.fn("ensforge.getRecordPermissions.record")(function* (record) {
          const supported = profileSupported(resolver.profiles, record);
          const requiredRole = resolverRecordRole(record);
          if (!supported) {
            return {
              record,
              supported,
              authorized: false,
              source: "none",
              requiredRole,
              resource: null,
            } as const;
          }
          if (!permissioned) {
            const source = ownerAuthorized
              ? "owner"
              : operatorAuthorized
                ? "operator-approval"
                : delegateAuthorized
                  ? "resolver-delegate"
                  : "none";
            return {
              record,
              supported,
              authorized: source !== "none",
              source,
              requiredRole,
              resource: null,
            } as const;
          }

          const part = resolverRecordPart(record);
          const node = namehash(name);
          const exact = resolverResource(node, part);
          const resources =
            BigInt(part) === 0n
              ? [exact]
              : [
                  exact,
                  resolverResource(namehash(""), part),
                  resolverResource(node, resolverRecordPart({ type: "clear" })),
                ];
          const checks = yield* Effect.all(
            resources.map((resource) =>
              ethereum.readContract({
                address: resolverAddress,
                abi: permissionedResolverV2InterfaceAbi,
                functionName: "hasRoles",
                args: [resource, requiredRole, parameters.account],
              }),
            ),
            { concurrency: "unbounded" },
          );
          const authorized = checks.some(Boolean);
          return {
            record,
            supported,
            authorized,
            source: authorized ? "resolver-role" : "none",
            requiredRole,
            resource: exact,
          } as const;
        }),
        { concurrency: "unbounded" },
      );
      return {
        resolver: resolverAddress,
        inherited: resolver.inherited,
        account: parameters.account,
        records,
      } satisfies RecordPermissionsResult;
    }),
  );
});

export const getRecordPermissions = defineReadAction<
  GetRecordPermissionsParameters,
  RecordPermissionsResult,
  CapabilityError
>(getRecordPermissionsEffect);

export type {
  CapabilityError as GetRecordPermissionsError,
  RecordPermission,
  RecordPermissionsResult,
} from "../types.js";
