/** IUniversalResolverV2 ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const universalResolverV2InterfaceAbi = [
  {
    type: "function",
    name: "findCanonicalName",
    inputs: [
      {
        name: "registry",
        type: "address",
        internalType: "contract IRegistry",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "findCanonicalRegistry",
    inputs: [
      {
        name: "name",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "findExactRegistry",
    inputs: [
      {
        name: "name",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "findOwner",
    inputs: [
      {
        name: "name",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "findParentRegistry",
    inputs: [
      {
        name: "name",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "findRegistries",
    inputs: [
      {
        name: "name",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "contract IRegistry[]",
      },
    ],
    stateMutability: "view",
  },
] as const;
