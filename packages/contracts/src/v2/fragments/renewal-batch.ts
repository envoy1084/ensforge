import type { Abi } from "viem";

export const ethRegistrarV2InterfaceRenewBatchAbi = [
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
        components: [
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
            internalType: "bytes32",
            name: "referrer",
            type: "bytes32",
          },
        ],
        internalType: "struct RenewData[]",
        name: "rds",
        type: "tuple[]",
      },
      {
        internalType: "contract IERC20",
        name: "paymentToken",
        type: "address",
      },
    ],
    name: "renewBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const ethRenewerV2InterfaceRenewBatchAbi = [
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
        components: [
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
            internalType: "bytes32",
            name: "referrer",
            type: "bytes32",
          },
        ],
        internalType: "struct RenewData[]",
        name: "rds",
        type: "tuple[]",
      },
      {
        internalType: "contract IERC20",
        name: "paymentToken",
        type: "address",
      },
    ],
    name: "renewBatch",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
