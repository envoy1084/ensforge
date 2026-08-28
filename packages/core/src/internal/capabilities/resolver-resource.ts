import { encodePacked, keccak256, stringToHex, toHex, type Hex } from "viem";

import type { Namehash } from "../../schemas/hash.js";

export type ResolverRecord =
  | { readonly type: "address"; readonly coinType: bigint }
  | { readonly type: "text"; readonly key: string }
  | { readonly type: "contentHash" }
  | { readonly type: "pubkey" }
  | { readonly type: "abi"; readonly contentType?: bigint | undefined }
  | { readonly type: "interface"; readonly interfaceId?: Hex | undefined }
  | { readonly type: "name" }
  | { readonly type: "data"; readonly key: string }
  | { readonly type: "clear" };

export const isResolverRecord = (operation: {
  readonly type: string;
}): operation is ResolverRecord =>
  operation.type === "address" ||
  operation.type === "text" ||
  operation.type === "contentHash" ||
  operation.type === "pubkey" ||
  operation.type === "abi" ||
  operation.type === "interface" ||
  operation.type === "name" ||
  operation.type === "data" ||
  operation.type === "clear";

export const resolverRecordRole = (record: ResolverRecord): bigint => {
  switch (record.type) {
    case "address":
      return 1n << 0n;
    case "text":
      return 1n << 4n;
    case "contentHash":
      return 1n << 8n;
    case "pubkey":
      return 1n << 12n;
    case "abi":
      return 1n << 16n;
    case "interface":
      return 1n << 20n;
    case "name":
      return 1n << 24n;
    case "clear":
      return 1n << 32n;
    case "data":
      return 1n << 36n;
  }
};

export const resolverRecordPart = (record: ResolverRecord): Hex => {
  switch (record.type) {
    case "address":
      return keccak256(toHex(record.coinType, { size: 32 }));
    case "text":
    case "data":
      return keccak256(stringToHex(record.key));
    case "abi":
    case "interface":
    case "contentHash":
    case "pubkey":
    case "name":
    case "clear":
      return toHex(0n, { size: 32 });
    default:
      return toHex(0n, { size: 32 });
  }
};

export const resolverResource = (node: Namehash, part: Hex): bigint => {
  if (BigInt(node) === 0n && BigInt(part) === 0n) return 0n;
  return BigInt(keccak256(encodePacked(["bytes32", "bytes32"], [node, part])));
};
