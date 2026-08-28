import { Effect } from "effect";

import { erc20Abi } from "@ensforge/contracts/shared";
import { standardRentPriceOracleV2Abi } from "@ensforge/contracts/v2";

import type { EthereumAddress } from "../../schemas/identity.js";
import { EthereumClient } from "../client/ethereum-client.js";

export const readPaymentTokenSupport = Effect.fn("readPaymentTokenSupport")(function* (
  oracle: EthereumAddress,
  token: EthereumAddress,
) {
  const ethereum = yield* EthereumClient;
  const supported = yield* ethereum.readContract({
    address: oracle,
    abi: standardRentPriceOracleV2Abi,
    functionName: "isPaymentToken",
    args: [token],
  });
  if (!supported) return { supported: false as const };

  const [symbol, decimals] = yield* Effect.all(
    [
      ethereum.readContract({ address: token, abi: erc20Abi, functionName: "symbol" }),
      ethereum.readContract({ address: token, abi: erc20Abi, functionName: "decimals" }),
    ] as const,
    { concurrency: "unbounded" },
  );
  return { supported: true as const, symbol, decimals };
});
