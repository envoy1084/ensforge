export const abiResolverAbi = [
  {
    type: "event",
    name: "ABIChanged",
    inputs: [
      { name: "node", type: "bytes32", indexed: true },
      { name: "contentType", type: "uint256", indexed: true },
    ],
    anonymous: false,
  },
  {
    type: "function",
    name: "ABI",
    stateMutability: "view",
    inputs: [
      { name: "node", type: "bytes32" },
      { name: "contentTypes", type: "uint256" },
    ],
    outputs: [
      { name: "", type: "uint256" },
      { name: "", type: "bytes" },
    ],
  },
] as const;

export const abiResolverInterfaceId = "0x2203ab56" as const;
