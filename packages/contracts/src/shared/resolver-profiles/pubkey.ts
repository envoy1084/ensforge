export const pubkeyResolverAbi = [
  {
    type: "event",
    name: "PubkeyChanged",
    inputs: [
      { name: "node", type: "bytes32", indexed: true },
      { name: "x", type: "bytes32", indexed: false },
      { name: "y", type: "bytes32", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "function",
    name: "pubkey",
    stateMutability: "view",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [
      { name: "x", type: "bytes32" },
      { name: "y", type: "bytes32" },
    ],
  },
] as const;

export const pubkeyResolverInterfaceId = "0xc8690233" as const;
