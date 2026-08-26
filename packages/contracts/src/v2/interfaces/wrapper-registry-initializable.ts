/** Complete IWrapperRegistryInitializable ABI from ENSv2. */
export const wrapperRegistryInitializableV2InterfaceAbi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "contract IRegistry",
        name: "parentRegistry",
        type: "address",
      },
      {
        internalType: "string",
        name: "childLabel",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
