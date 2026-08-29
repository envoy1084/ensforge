import type { Abi } from "viem";

export const ethRegistrarControllerV1CommitAbi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "commitment",
        type: "bytes32",
      },
    ],
    name: "CommitmentNotFound",
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
        internalType: "uint256",
        name: "minimumCommitmentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTimestamp",
        type: "uint256",
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
        internalType: "uint256",
        name: "maximumCommitmentTimestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentTimestamp",
        type: "uint256",
      },
    ],
    name: "CommitmentTooOld",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
    ],
    name: "DurationTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientValue",
    type: "error",
  },
  {
    inputs: [],
    name: "MaxCommitmentAgeTooHigh",
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
        name: "name",
        type: "string",
      },
    ],
    name: "NameNotAvailable",
    type: "error",
  },
  {
    inputs: [],
    name: "ResolverRequiredForReverseRecord",
    type: "error",
  },
  {
    inputs: [],
    name: "ResolverRequiredWhenDataSupplied",
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
