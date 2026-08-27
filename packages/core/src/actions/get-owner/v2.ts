import { Effect } from "effect";

import type { EnsV2Deployment } from "@ensforge/contracts/deployments";
import { universalResolverV2InterfaceAbi } from "@ensforge/contracts/v2";
import { isAddressEqual, zeroAddress } from "viem";

import type { CodecError } from "../../errors/codec-error.js";
import type { ViemError } from "../../errors/viem-error.js";
import { EthereumClient } from "../../internal/client/ethereum-client.js";
import type { ReadContext } from "../../internal/read/execution-context.js";
import { dnsEncodeName } from "../../names/dns.js";
import type { NormalizedName } from "../../schemas/name.js";
import type { OwnerResult } from "./types.js";

export const getOwnerV2 = Effect.fn("getOwnerV2")(function* (
  name: NormalizedName,
  deployment: EnsV2Deployment,
): Effect.fn.Return<OwnerResult | null, CodecError | ViemError, EthereumClient | ReadContext> {
  const ethereum = yield* EthereumClient;
  const dnsName = yield* dnsEncodeName.effect(name);
  const owner = yield* ethereum.readContract({
    address: deployment.contracts.universalResolver,
    abi: universalResolverV2InterfaceAbi,
    functionName: "findOwner",
    args: [dnsName],
  });

  return isAddressEqual(owner, zeroAddress)
    ? null
    : {
        name,
        owner,
        registrant: null,
        protocol: "v2",
        ownershipLevel: "registry",
      };
});
