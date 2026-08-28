import { BaseError, ContractFunctionRevertedError, TimeoutError } from "viem";
import { describe, expect, it } from "vitest";

import { ContractError, RpcError } from "../../../src/index.js";
import { viemErrorToEffectError } from "../../../src/internal/errors/viem-error.js";

describe("Viem error translation", () => {
  it("preserves a decoded contract revert as the cause", () => {
    const cause = new ContractFunctionRevertedError({
      abi: [
        {
          type: "error",
          name: "Unauthorized",
          inputs: [],
        },
      ],
      data: "0x82b42900",
      functionName: "owner",
    });

    expect(viemErrorToEffectError(cause, "readContract")).toEqual(
      new ContractError({
        code: "REVERTED",
        message: cause.shortMessage,
        cause,
      }),
    );
  });

  it("finds transport errors nested inside Viem wrappers", () => {
    const timeout = new TimeoutError({ body: {}, url: "https://rpc.example" });
    const cause = new BaseError("The contract call failed", { cause: timeout });

    expect(viemErrorToEffectError(cause, "readContract")).toEqual(
      new RpcError({
        code: "REQUEST_TIMEOUT",
        message: timeout.shortMessage,
        cause,
      }),
    );
  });

  it("uses an operation-specific fallback without discarding the cause", () => {
    const cause = new Error("Multicall is unavailable");

    expect(viemErrorToEffectError(cause, "multicall")).toEqual(
      new ContractError({
        code: "MULTICALL_FAILED",
        message: cause.message,
        cause,
      }),
    );
  });
});
