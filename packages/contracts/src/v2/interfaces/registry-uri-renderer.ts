/** IRegistryURIRenderer ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const registryUriRendererV2InterfaceAbi = [
  {
    type: "function",
    name: "renderURI",
    inputs: [
      {
        name: "registry",
        type: "address",
        internalType: "contract IRegistry",
      },
      {
        name: "tokenId",
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
] as const;
