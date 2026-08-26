export const nameResolverAbi = [
  {
    type: "event",
    name: "NameChanged",
    inputs: [
      { name: "node", type: "bytes32", indexed: true },
      { name: "name", type: "string", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "function",
    name: "name",
    stateMutability: "view",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ name: "", type: "string" }],
  },
] as const;

export const nameResolverInterfaceId = "0x691f3431" as const;
