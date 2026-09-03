import { getAddress, isAddress, isHex } from "viem";
import { normalize } from "viem/ens";

import { failure, type InputCodec, success } from "./codec";

export const stringCodec = (
  options: {
    readonly initialValue?: string;
    readonly message?: string;
    readonly optional?: boolean;
  } = {},
): InputCodec<string | undefined> => ({
  initialValue: options.initialValue ?? "",
  decode: (draft) => {
    const value = draft.trim();
    if (value.length > 0) return success(value);
    if (options.optional) return success(undefined);
    return failure(options.message ?? "Enter a value");
  },
});

export const ensNameCodec = (initialValue = ""): InputCodec<string> => ({
  initialValue,
  decode: (draft) => {
    const value = draft.trim();
    if (value.length === 0) return failure("Enter an ENS name");
    try {
      return success(normalize(value));
    } catch {
      return failure("Enter a valid ENS name");
    }
  },
});

export const addressCodec = (
  options: {
    readonly initialValue?: string;
    readonly optional?: boolean;
  } = {},
): InputCodec<`0x${string}` | undefined> => ({
  initialValue: options.initialValue ?? "",
  decode: (draft) => {
    const value = draft.trim();
    if (value.length === 0 && options.optional) return success(undefined);
    if (!isAddress(value)) return failure("Enter a valid Ethereum address");
    return success(getAddress(value));
  },
});

export const bigintCodec = (
  options: {
    readonly initialValue?: bigint;
    readonly minimum?: bigint;
    readonly optional?: boolean;
  } = {},
): InputCodec<bigint | undefined> => ({
  initialValue: options.initialValue?.toString() ?? "",
  decode: (draft) => {
    const value = draft.trim();
    if (value.length === 0 && options.optional) return success(undefined);
    if (!/^-?\d+$/.test(value)) return failure("Enter a whole number");
    const decoded = BigInt(value);
    if (options.minimum !== undefined && decoded < options.minimum) {
      return failure(`Enter a value greater than or equal to ${options.minimum}`);
    }
    return success(decoded);
  },
});

export const integerCodec = (
  options: {
    readonly initialValue?: number;
    readonly minimum?: number;
    readonly maximum?: number;
    readonly optional?: boolean;
  } = {},
): InputCodec<number | undefined> => ({
  initialValue: options.initialValue?.toString() ?? "",
  decode: (draft) => {
    const value = draft.trim();
    if (value.length === 0 && options.optional) return success(undefined);
    if (!/^\d+$/.test(value)) return failure("Enter a whole number");
    const decoded = Number(value);
    if (!Number.isSafeInteger(decoded)) return failure("Enter a safe whole number");
    if (options.minimum !== undefined && decoded < options.minimum) {
      return failure(`Enter a value greater than or equal to ${options.minimum}`);
    }
    if (options.maximum !== undefined && decoded > options.maximum) {
      return failure(`Enter a value less than or equal to ${options.maximum}`);
    }
    return success(decoded);
  },
});

export const hexCodec = (
  options: {
    readonly bytes?: number;
    readonly initialValue?: `0x${string}`;
    readonly optional?: boolean;
  } = {},
): InputCodec<`0x${string}` | undefined> => ({
  initialValue: options.initialValue ?? "",
  decode: (draft) => {
    const value = draft.trim();
    if (value.length === 0 && options.optional) return success(undefined);
    if (!isHex(value) || (options.bytes !== undefined && value.length !== 2 + options.bytes * 2)) {
      return failure(options.bytes ? `Enter a ${options.bytes}-byte hex value` : "Enter hex data");
    }
    return success(value);
  },
});

export const booleanCodec: InputCodec<boolean, boolean> = {
  initialValue: false,
  decode: success,
};

export const stringListCodec = (
  options: {
    readonly initialValue?: ReadonlyArray<string>;
    readonly minimumLength?: number;
  } = {},
): InputCodec<ReadonlyArray<string>, ReadonlyArray<string>> => ({
  initialValue: options.initialValue ?? [],
  decode: (draft) => {
    const values = draft.map((value) => value.trim()).filter(Boolean);
    if (values.length < (options.minimumLength ?? 0)) return failure("Add at least one value");
    return success(values);
  },
});

export const bigintListCodec = (
  options: {
    readonly initialValue?: ReadonlyArray<bigint>;
    readonly minimumLength?: number;
  } = {},
): InputCodec<ReadonlyArray<bigint>, ReadonlyArray<string>> => ({
  initialValue: options.initialValue?.map(String) ?? [],
  decode: (draft) => {
    const values = draft.map((value) => value.trim()).filter(Boolean);
    if (values.length < (options.minimumLength ?? 0)) return failure("Add at least one value");
    if (values.some((value) => !/^\d+$/.test(value))) {
      return failure("Every value must be a whole number");
    }
    return success(values.map(BigInt));
  },
});
