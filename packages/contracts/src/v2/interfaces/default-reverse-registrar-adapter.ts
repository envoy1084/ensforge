/** Complete IDefaultReverseRegistrarAdapter ABI from ENSv2. */
export const defaultReverseRegistrarAdapterV2InterfaceAbi = [
  {
    inputs: [],
    name: "DEFAULT_REVERSE_REGISTRAR",
    outputs: [
      {
        internalType: "contract IDefaultReverseRegistrar",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setNameWithHCA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
