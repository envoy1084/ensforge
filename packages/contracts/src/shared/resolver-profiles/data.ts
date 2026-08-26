export const dataResolverAbi = [
  {
    type: "event",
    name: "DataChanged",
    inputs: [
      { name: "node", type: "bytes32", indexed: true },
      { name: "indexedKey", type: "string", indexed: true },
      { name: "key", type: "string", indexed: false },
      { name: "indexedData", type: "bytes", indexed: true },
    ],
    anonymous: false,
  },
  {
    type: "function",
    name: "data",
    stateMutability: "view",
    inputs: [
      { name: "node", type: "bytes32" },
      { name: "key", type: "string" },
    ],
    outputs: [{ name: "", type: "bytes" }],
  },
] as const;

export const dataResolverInterfaceId = "0xecbfada3" as const;
