import type { Abi } from "viem";

const publicResolverV1Errors = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "addressBytes",
        type: "bytes",
      },
    ],
    name: "InvalidEVMAddress",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "offset",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "OffsetOutOfBoundsError",
    type: "error",
  },
] as const satisfies Abi;

export const publicResolverV1ApproveAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1ClearRecordsAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
    ],
    name: "clearRecords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1IsApprovedForAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "isApprovedFor",
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

export const publicResolverV1IsApprovedForAllAbi = [
  ...publicResolverV1Errors,
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

export const publicResolverV1MulticallAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1MulticallWithNodeCheckAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "nodehash",
        type: "bytes32",
      },
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicallWithNodeCheck",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetABIAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "contentType",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "setABI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetAddrAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "coinType",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "addressBytes",
        type: "bytes",
      },
    ],
    name: "setAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
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
        name: "_addr",
        type: "address",
      },
    ],
    name: "setAddr",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetContenthashAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "hash",
        type: "bytes",
      },
    ],
    name: "setContenthash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetDNSRecordsAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "setDNSRecords",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetDataAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "setData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetInterfaceAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes4",
        name: "interfaceID",
        type: "bytes4",
      },
      {
        internalType: "address",
        name: "implementer",
        type: "address",
      },
    ],
    name: "setInterface",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetNameAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "newName",
        type: "string",
      },
    ],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetPubkeyAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "x",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "y",
        type: "bytes32",
      },
    ],
    name: "setPubkey",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetTextAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "key",
        type: "string",
      },
      {
        internalType: "string",
        name: "value",
        type: "string",
      },
    ],
    name: "setText",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const publicResolverV1SetZonehashAbi = [
  ...publicResolverV1Errors,
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "node",
        type: "bytes32",
      },
      {
        internalType: "bytes",
        name: "hash",
        type: "bytes",
      },
    ],
    name: "setZonehash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
