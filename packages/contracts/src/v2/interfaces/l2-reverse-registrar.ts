/** Complete IL2ReverseRegistrar ABI from ENSv2. */
export const l2ReverseRegistrarV2InterfaceAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "inceptionOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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
        name: "addr",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "setNameForAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "chainIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "signedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IL2ReverseRegistrar.NameClaim",
        name: "claim",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "setNameForAddrWithSignature",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "addr",
            type: "address",
          },
          {
            internalType: "uint256[]",
            name: "chainIds",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "signedAt",
            type: "uint256",
          },
        ],
        internalType: "struct IL2ReverseRegistrar.NameClaim",
        name: "claim",
        type: "tuple",
      },
      {
        internalType: "address",
        name: "namer",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "setNameForContractWithSignature",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "syncName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
