import type { Abi } from "viem";

const nameWrapperV1Errors = [
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
] as const satisfies Abi;

export const nameWrapperV1ApproveAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1CanExtendSubnamesAbi = [
  ...nameWrapperV1Errors,
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
    name: "canExtendSubnames",
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

export const nameWrapperV1CanModifyNameAbi = [
  ...nameWrapperV1Errors,
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
    name: "canModifyName",
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

export const nameWrapperV1ExtendExpiryAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "parentNode",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "labelhash",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
      },
    ],
    name: "extendExpiry",
    outputs: [
      {
        internalType: "uint64",
        name: "",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1GetApprovedAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1GetDataAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getData",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "fuses",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1IsApprovedForAllAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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

export const nameWrapperV1IsWrappedAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "parentNode",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "labelhash",
        type: "bytes32",
      },
    ],
    name: "isWrapped",
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
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "isWrapped",
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

export const nameWrapperV1OwnerOfAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SafeTransferFromAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SetChildFusesAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "parentNode",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "labelhash",
        type: "bytes32",
      },
      {
        internalType: "uint32",
        name: "fuses",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
      },
    ],
    name: "setChildFuses",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SetFusesAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint16",
        name: "ownerControlledFuses",
        type: "uint16",
      },
    ],
    name: "setFuses",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SetResolverAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "setResolver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SetSubnodeOwnerAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "parentNode",
        type: "bytes32",
      },
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
        internalType: "uint32",
        name: "fuses",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
      },
    ],
    name: "setSubnodeOwner",
    outputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SetSubnodeRecordAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "parentNode",
        type: "bytes32",
      },
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
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "fuses",
        type: "uint32",
      },
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
      },
    ],
    name: "setSubnodeRecord",
    outputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1SetTTLAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint64",
        name: "ttl",
        type: "uint64",
      },
    ],
    name: "setTTL",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1UnwrapAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "parentNode",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "labelhash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "unwrap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1UnwrapETH2LDAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "labelhash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "registrant",
        type: "address",
      },
      {
        internalType: "address",
        name: "controller",
        type: "address",
      },
    ],
    name: "unwrapETH2LD",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1WrapAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "wrappedOwner",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "wrap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const nameWrapperV1WrapETH2LDAbi = [
  ...nameWrapperV1Errors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
      {
        internalType: "address",
        name: "wrappedOwner",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "ownerControlledFuses",
        type: "uint16",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
    ],
    name: "wrapETH2LD",
    outputs: [
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
