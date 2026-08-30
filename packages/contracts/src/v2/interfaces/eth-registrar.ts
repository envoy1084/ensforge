/** IETHRegistrar ABI from the deployed ENSv2 Sepolia contract snapshot. */
export const ethRegistrarV2InterfaceAbi = [
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
    name: "commit",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "commitmentAt",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        internalType: "bytes32",
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
    name: "getRegisterPrice",
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
    name: "isAvailable",
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
    name: "makeCommitment",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "secret",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "subregistry",
        type: "address",
        internalType: "contract IRegistry",
      },
      {
        name: "resolver",
        type: "address",
        internalType: "address",
      },
      {
        name: "duration",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "referrer",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "register",
    inputs: [
      {
        name: "label",
        type: "string",
        internalType: "string",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "secret",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "subregistry",
        type: "address",
        internalType: "contract IRegistry",
      },
      {
        name: "resolver",
        type: "address",
        internalType: "address",
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
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "CommitmentMade",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NameRegistered",
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
        name: "owner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "subregistry",
        type: "address",
        indexed: false,
        internalType: "contract IRegistry",
      },
      {
        name: "resolver",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "duration",
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
        name: "base",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "premium",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
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
    name: "CommitmentTooNew",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "validFrom",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "blockTimestamp",
        type: "uint64",
        internalType: "uint64",
      },
    ],
  },
  {
    type: "error",
    name: "CommitmentTooOld",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "validTo",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "blockTimestamp",
        type: "uint64",
        internalType: "uint64",
      },
    ],
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
    name: "NameNotAvailable",
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
    name: "NameNotRenewable",
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
    name: "UnexpiredCommitmentExists",
    inputs: [
      {
        name: "commitment",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
] as const;
