/** IContractNamer ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const contractNamerV2InterfaceAbi = [
  {
    type: "function",
    name: "isContractNamer",
    inputs: [
      {
        name: "namer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
] as const;
