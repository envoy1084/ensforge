/** ILabelStore ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const labelStoreV2InterfaceAbi = [
  {
    type: "function",
    name: "getLabel",
    inputs: [
      {
        name: "anyId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setLabel",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Label",
    inputs: [
      {
        name: "labelHash",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "label",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
] as const;
