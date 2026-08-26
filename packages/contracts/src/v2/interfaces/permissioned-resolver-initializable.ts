/** Complete IPermissionedResolverInitializable ABI from ENSv2. */
export const permissionedResolverInitializableV2InterfaceAbi = [
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
      {
        internalType: "bytes[]",
        name: "calls",
        type: "bytes[]",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
