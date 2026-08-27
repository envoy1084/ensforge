import { Schema } from "effect";

import { describe, expect, it } from "vitest";

import {
  AddressRecordData,
  CanonicalNameIdentity,
  CoinType,
  ContentHash,
  DnsEncodedName,
  Labelhash,
  Namehash,
  NormalizedLabel,
  NormalizedName,
  RegistryResource,
} from "../../src/index.js";

const zeroHash = `0x${"00".repeat(32)}`;

describe("domain schemas", () => {
  it("accepts canonical names and treats the root as a name, not a label", () => {
    expect(Schema.is(NormalizedName)("example.eth")).toBe(true);
    expect(Schema.is(NormalizedName)("")).toBe(true);
    expect(Schema.is(NormalizedName)("Example.eth")).toBe(false);
    expect(Schema.is(NormalizedLabel)("example")).toBe(true);
    expect(Schema.is(NormalizedLabel)("")).toBe(false);
    expect(Schema.is(NormalizedLabel)("example.eth")).toBe(false);
  });

  it("validates fixed hashes and encoded byte values", () => {
    expect(Schema.is(Namehash)(zeroHash)).toBe(true);
    expect(Schema.is(Labelhash)(zeroHash)).toBe(true);
    expect(Schema.is(Namehash)("0x00")).toBe(false);
    expect(Schema.is(AddressRecordData)("0x")).toBe(true);
    expect(Schema.is(ContentHash)("0x1234")).toBe(true);
    expect(Schema.is(ContentHash)("0x123")).toBe(false);
  });

  it("validates complete zero-terminated DNS wire names", () => {
    expect(Schema.is(DnsEncodedName)("0x00")).toBe(true);
    expect(Schema.is(DnsEncodedName)("0x03666f6f0365746800")).toBe(true);
    expect(Schema.is(DnsEncodedName)("0x03666f6f03657468")).toBe(false);
    expect(Schema.is(DnsEncodedName)("0x0001")).toBe(false);
  });

  it("validates coin types, resources, and canonical identities", () => {
    expect(Schema.is(CoinType)(60n)).toBe(true);
    expect(Schema.is(CoinType)(-1n)).toBe(false);
    expect(Schema.is(CoinType)(0x1_0000_0000n)).toBe(false);
    expect(Schema.is(RegistryResource)(0n)).toBe(true);
    expect(Schema.is(RegistryResource)(1n << 256n)).toBe(false);

    expect(
      Schema.is(CanonicalNameIdentity)({
        name: "example.eth",
        namehash: zeroHash,
        chainId: 1,
        registry: "0x0000000000000000000000000000000000000001",
        protocol: "v1",
      }),
    ).toBe(true);
  });
});
