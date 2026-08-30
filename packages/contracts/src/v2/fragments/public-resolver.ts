import type { Abi } from "viem";

export const publicResolverV2CanModifyNameAbi = [
  {
    inputs: [
      { internalType: "bytes32", name: "node", type: "bytes32" },
      { internalType: "address", name: "operator", type: "address" },
    ],
    name: "canModifyName",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;
