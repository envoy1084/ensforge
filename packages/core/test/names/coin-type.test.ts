import { describe, expect, it } from "vitest";

import { CodecError, fromCoinType, toCoinType } from "../../src/index.js";

describe("fromCoinType", () => {
  it("distinguishes Ethereum, namespaced EVM chains, and SLIP-44 coins", () => {
    expect(fromCoinType(60n)).toEqual({ namespace: "evm", chainId: 1 });
    expect(fromCoinType(0x8000_000an)).toEqual({ namespace: "evm", chainId: 10 });
    expect(fromCoinType(0n)).toEqual({ namespace: "slip44", coinType: 0n });
  });

  it("rejects values outside the coin-type range", () => {
    expect(() => fromCoinType(0x1_0000_0000n)).toThrow(
      new CodecError({
        code: "INVALID_COIN_TYPE",
        message: "Invalid ENS coin type: 4294967296",
      }),
    );
  });

  it("rejects chain IDs that viem would otherwise coerce", () => {
    expect(() => toCoinType(1.5)).toThrow(
      new CodecError({
        code: "INVALID_CHAIN_ID",
        message: "Invalid EVM chain ID: 1.5",
      }),
    );
  });
});
