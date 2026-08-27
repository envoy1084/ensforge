import { describe, expect, it } from "vitest";

import { CodecError, dnsDecodeName, dnsEncodeName } from "../../src/index.js";

describe("DNS name codecs", () => {
  it("decodes names encoded by the public encoder", () => {
    expect(dnsDecodeName(dnsEncodeName("example.eth"))).toBe("example.eth");
    expect(dnsDecodeName("0x00")).toBe("");
  });

  it("rejects malformed wire data", () => {
    expect(() => dnsDecodeName("0x03666f6f03657468")).toThrow(
      new CodecError({
        code: "MALFORMED_DNS_PACKET",
        message: "Unable to decode malformed DNS name bytes",
      }),
    );
  });

  it("rejects wire data containing a non-normalized name", () => {
    expect(() => dnsDecodeName("0x03466f6f0365746800")).toThrow(
      new CodecError({
        code: "INVALID_DNS_NAME",
        message: "DNS name bytes must contain an ENSIP-15 normalized name",
      }),
    );
  });
});
