/** Complete ReverseRegistrarAdapter ABI from the ENSv2 Sepolia deployment. */
export const reverseRegistrarAdapterV2Abi = [
  {
    inputs: [
      {
        internalType: "contract IReverseRegistrar",
        name: "reverseRegistrar",
        type: "address",
      },
      {
        internalType: "contract IStandaloneHCAFactory",
        name: "standaloneHCAFactory",
        type: "address",
      },
      {
        internalType: "contract IContractNamer",
        name: "contractNamer",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "hca",
        type: "address",
      },
    ],
    name: "HCADeploymentNotTrusted",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "hcaOwner",
        type: "address",
      },
    ],
    name: "HCAOwnerMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "namer",
        type: "address",
      },
    ],
    name: "UnauthorizedNamer",
    type: "error",
  },
  {
    inputs: [],
    name: "CONTRACT_NAMER",
    outputs: [
      {
        internalType: "contract IContractNamer",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVERSE_REGISTRAR",
    outputs: [
      {
        internalType: "contract IReverseRegistrar",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STANDALONE_HCA_FACTORY",
    outputs: [
      {
        internalType: "contract IStandaloneHCAFactory",
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
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
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
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "claimWithHCA",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "namer",
        type: "address",
      },
    ],
    name: "isContractNamer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
