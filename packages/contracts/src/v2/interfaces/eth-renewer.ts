/** IETHRenewer ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const ethRenewerV2InterfaceAbi = [
  {
    type: "function",
    name: "GRACE_PERIOD",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRemainingGracePeriod",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
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
    type: "function",
    name: "isRenewable",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renew",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
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
      {
        name: "referrer",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "NameRenewed",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "label",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "duration",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "newExpiry",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "paymentToken",
        type: "address",
        indexed: false,
        internalType: "contract IERC20",
      },
      {
        name: "referrer",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "DurationTooShort",
    inputs: [
      {
        name: "duration",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "minDuration",
        type: "uint64",
        internalType: "uint64",
      },
    ],
  },
  {
    type: "error",
    name: "NameNotRenewable",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
    ],
  },
] as const;
