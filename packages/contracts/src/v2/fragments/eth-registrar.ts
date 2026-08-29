import type { Abi } from "viem";

const ethRegistrarV2Errors = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "validFrom",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "blockTimestamp",
        type: "uint64",
      },
    ],
    name: "CommitmentTooNew",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "validTo",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "blockTimestamp",
        type: "uint64",
      },
    ],
    name: "CommitmentTooOld",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "minDuration",
        type: "uint64",
      },
    ],
    name: "DurationTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxCommitmentAgeTooLow",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
    ],
    name: "NameNotAvailable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
    ],
    name: "NameNotRenewable",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    name: "UnexpiredCommitmentExists",
    type: "error",
  },
] as const satisfies Abi;

export const ethRegistrarV2MaxCommitmentAgeAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [],
    name: "MAX_COMMITMENT_AGE",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2MinCommitmentAgeAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [],
    name: "MIN_COMMITMENT_AGE",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2MinRegisterDurationAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [],
    name: "MIN_REGISTER_DURATION",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2MinRenewDurationAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [],
    name: "MIN_RENEW_DURATION",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2CommitmentAtAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    name: "commitmentAt",
    outputs: [
      {
        internalType: "uint64",
        name: "commitTime",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2GetRegisterPriceAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        internalType: "contract IERC20",
        name: "paymentToken",
        type: "address",
      },
    ],
    name: "getRegisterPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "base",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "premium",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2IsAvailableAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
    ],
    name: "isAvailable",
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
] as const satisfies Abi;

export const ethRegistrarV2IsRenewableAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
    ],
    name: "isRenewable",
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
] as const satisfies Abi;

export const ethRegistrarV2MakeCommitmentAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "secret",
        type: "bytes32",
      },
      {
        internalType: "contract IRegistry",
        name: "subregistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
    ],
    name: "makeCommitment",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2RegisterAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "secret",
        type: "bytes32",
      },
      {
        internalType: "contract IRegistry",
        name: "subregistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "duration",
        type: "uint64",
      },
      {
        internalType: "contract IERC20",
        name: "paymentToken",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
    ],
    name: "register",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2RentPriceOracleAbi = [
  ...ethRegistrarV2Errors,
  {
    inputs: [],
    name: "rentPriceOracle",
    outputs: [
      {
        internalType: "contract IRentPriceOracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;
