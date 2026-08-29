import {
  BaseError,
  ContractFunctionRevertedError,
  encodeErrorResult,
  TimeoutError,
  toFunctionSelector,
} from "viem";
import { describe, expect, it } from "vitest";

import { ContractError, RpcError } from "../../../src/index.js";
import {
  isContractRevertWithData,
  viemErrorToEffectError,
} from "../../../src/internal/errors/viem-error.js";

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

  it("recognizes a specific error nested inside resolver revert data", () => {
    const nestedAbi = [
      { type: "error", name: "UnreachableName", inputs: [{ name: "name", type: "bytes" }] },
    ] as const;
    const outerAbi = [
      { type: "error", name: "ResolverError", inputs: [{ name: "errorData", type: "bytes" }] },
    ] as const;
    const cause = new ContractFunctionRevertedError({
      abi: outerAbi,
      data: encodeErrorResult({
        abi: outerAbi,
        errorName: "ResolverError",
        args: [encodeErrorResult({ abi: nestedAbi, errorName: "UnreachableName", args: ["0x00"] })],
      }),
      functionName: "reverse",
    });

    expect(
      isContractRevertWithData(
        cause,
        "ResolverError",
        toFunctionSelector("UnreachableName(bytes)"),
      ),
    ).toBe(true);
    expect(
      isContractRevertWithData(
        cause,
        "ResolverError",
        toFunctionSelector("ResolverNotFound(bytes)"),
      ),
    ).toBe(false);
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
