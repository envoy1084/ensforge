import { describe, expect, it } from "vitest";

import {
  CodecError,
  decodeAddressRecord,
  decodeContentHash,
  encodeAddressRecord,
  encodeContentHash,
} from "../../src/index.js";

describe("record codec boundaries", () => {
  it("preserves an address through the official ENS address coder", () => {
    const address = "0x0000000000000000000000000000000000000001";
    const encoded = encodeAddressRecord({ coinType: 60n, address });

    expect(decodeAddressRecord({ coinType: 60n, data: encoded })).toBe(address);
  });

  it("maps unsupported address coin types to a stable error", () => {
    expect(() =>
      encodeAddressRecord({
        coinType: 999_999n,
        address: "not-an-address",
      }),
    ).toThrow(
      new CodecError({
        code: "UNSUPPORTED_COIN_TYPE",
        message: "No address codec is available for coin type 999999",
      }),
    );
  });

  it("represents empty resolver records as unset", () => {
    expect(decodeAddressRecord({ coinType: 60n, data: "0x" })).toBeNull();
    expect(decodeContentHash("0x")).toBeNull();
  });

  it("preserves contenthash metadata around the official ENS codec", () => {
    const encoded = encodeContentHash({
      codec: "ipfs",
      value: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    });

    const decoded = decodeContentHash(encoded);

    expect(decoded?.codec).toBe("ipfs");
    expect(decoded?.value.length).toBeGreaterThan(0);
  });

  it("rejects unsupported contenthash codecs at the boundary", () => {
    expect(() => encodeContentHash({ codec: "ftp" as "ipfs", value: "example" })).toThrow(
      new CodecError({
        code: "UNSUPPORTED_CONTENT_CODEC",
        message: "Unsupported content hash codec: ftp",
      }),
    );
  });
});
