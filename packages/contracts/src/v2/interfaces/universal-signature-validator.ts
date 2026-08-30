/** IUniversalSignatureValidator ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const universalSignatureValidatorV2InterfaceAbi = [
  {
    type: "function",
    name: "isValidSig",
    inputs: [
      {
        name: "signer",
        type: "address",
        internalType: "address",
      },
      {
        name: "hash",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
] as const;
