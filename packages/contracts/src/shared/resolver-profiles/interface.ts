export const interfaceResolverAbi = [
  {
    type: "event",
    name: "InterfaceChanged",
    inputs: [
      { name: "node", type: "bytes32", indexed: true },
      { name: "interfaceID", type: "bytes4", indexed: true },
      { name: "implementer", type: "address", indexed: false },
    ],
    anonymous: false,
  },
  {
    type: "function",
    name: "interfaceImplementer",
    stateMutability: "view",
    inputs: [
      { name: "node", type: "bytes32" },
      { name: "interfaceID", type: "bytes4" },
    ],
    outputs: [{ name: "", type: "address" }],
  },
] as const;

export const interfaceResolverInterfaceId = "0x124a319c" as const;
