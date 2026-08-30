/** IAddressSet ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const addressSetV2InterfaceAbi = [
  {
    type: "function",
    name: "includes",
    inputs: [
      {
        name: "addr",
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
