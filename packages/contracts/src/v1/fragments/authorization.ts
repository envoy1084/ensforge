import type { Abi } from "viem";

export const baseRegistrarV1SetApprovalForAllAbi = [
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SetApprovalForAllAbi = [
  {
    inputs: [],
    name: "CannotUpgrade",
    type: "error",
  },
  {
    inputs: [],
    name: "IncompatibleParent",
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
    name: "IncorrectTargetOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "IncorrectTokenType",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "labelHash",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "expectedLabelhash",
        type: "bytes32",
      },
    ],
    name: "LabelMismatch",
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
    name: "LabelTooLong",
    type: "error",
  },
  {
    inputs: [],
    name: "LabelTooShort",
    type: "error",
  },
  {
    inputs: [],
    name: "NameIsNotWrapped",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "OperationProhibited",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "Unauthorised",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
