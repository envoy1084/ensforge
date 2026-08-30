/** IL2ReverseRegistrar ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const l2ReverseRegistrarV2InterfaceAbi = [
  {
    type: "function",
    name: "inceptionOf",
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
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setName",
    inputs: [
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setNameForAddr",
    inputs: [
      {
        name: "addr",
        type: "address",
        internalType: "address",
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setNameForAddrWithSignature",
    inputs: [
      {
        name: "claim",
        type: "tuple",
        internalType: "struct IL2ReverseRegistrar.NameClaim",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "addr",
            type: "address",
            internalType: "address",
          },
          {
            name: "chainIds",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "signedAt",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setNameForContractWithSignature",
    inputs: [
      {
        name: "claim",
        type: "tuple",
        internalType: "struct IL2ReverseRegistrar.NameClaim",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "addr",
            type: "address",
            internalType: "address",
          },
          {
            name: "chainIds",
            type: "uint256[]",
            internalType: "uint256[]",
          },
          {
            name: "signedAt",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
      {
        name: "namer",
        type: "address",
        internalType: "address",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "syncName",
    inputs: [
      {
        name: "addr",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;
