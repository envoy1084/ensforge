/** IRentPriceOracle ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const rentPriceOracleV2InterfaceAbi = [
  {
    type: "function",
    name: "getRegisterPrice",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
      {
        name: "available",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "duration",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "paymentToken",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    outputs: [
      {
        name: "base",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "premium",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRenewPrice",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
      {
        name: "expiry",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "duration",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "paymentToken",
        type: "address",
        internalType: "contract IERC20",
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
    type: "error",
    name: "NotValid",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "PaymentTokenNotSupported",
    inputs: [
      {
        name: "paymentToken",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
  },
] as const;
