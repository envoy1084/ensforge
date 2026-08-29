import type { Abi } from "viem";

export const bulkRenewalV1RenewAllAbi = [
  {
    inputs: [
      {
        internalType: "string[]",
        name: "names",
        type: "string[]",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
    ],
    name: "renewAll",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const satisfies Abi;
