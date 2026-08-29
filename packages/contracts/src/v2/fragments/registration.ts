import type { Abi } from "viem";

export const ethRegistrarV2CommitAbi = [
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    name: "commit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2RenewAbi = [
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
      {
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
    ],
    name: "renew",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const ethRegistrarV2RenewalPriceAbi = [
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
    name: "getRenewPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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

export const ethRenewerV1RenewAbi = [
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
      {
        internalType: "bytes32",
        name: "referrer",
        type: "bytes32",
      },
    ],
    name: "renew",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const ethRenewerV1RenewalPriceAbi = [
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
    name: "getRenewPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
