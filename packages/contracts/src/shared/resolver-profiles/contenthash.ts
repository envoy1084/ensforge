export const contenthashResolverAbi = [
  {
    type: "event",
    name: "ContenthashChanged",
    inputs: [
      { name: "node", type: "bytes32", indexed: true },
      { name: "hash", type: "bytes", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "function",
    name: "contenthash",
    stateMutability: "view",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ name: "", type: "bytes" }],
  },
] as const;

export const contenthashResolverInterfaceId = "0xbc1c58d1" as const;
