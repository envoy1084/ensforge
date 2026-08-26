/** Complete IEACGrantInitializable ABI from ENSv2. */
export const eacGrantInitializableV2Abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "roleBitmap",
            type: "uint256",
          },
        ],
        internalType: "struct Grant[]",
        name: "grants",
        type: "tuple[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
