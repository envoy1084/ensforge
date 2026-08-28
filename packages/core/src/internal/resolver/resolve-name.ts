import { Effect } from "effect";

import { universalResolverV1Abi } from "@ensforge/contracts/v1";
import { universalResolverV2Abi } from "@ensforge/contracts/v2";
import type { Address, Hex } from "viem";

import type { ViemError } from "../../errors/viem-error.js";
import { EthereumClient } from "../client/ethereum-client.js";
import { ReadContext } from "../read/execution-context.js";

export interface ResolveNameParameters {
  readonly universalResolver: Address;
  readonly protocol: "v1" | "v2";
  readonly name: Hex;
  readonly data: Hex;
}

export const resolveName = Effect.fn("resolveName")(function* ({
  universalResolver,
  protocol,
  name,
  data,
}: ResolveNameParameters): Effect.fn.Return<
  readonly [Hex, Address],
  ViemError,
  EthereumClient | ReadContext
> {
  const ethereum = yield* EthereumClient;
  const context = yield* ReadContext;
  const block = context.block;

  if (protocol === "v1") {
    return yield* ethereum.readContractDirect({
      address: universalResolver,
      abi: universalResolverV1Abi,
      functionName: "resolve",
      args: [name, data],
      ...block,
    });
  }

  return yield* ethereum.readContractDirect({
    address: universalResolver,
    abi: universalResolverV2Abi,
    functionName: "resolve",
    args: [name, data],
    ...block,
  });
});
