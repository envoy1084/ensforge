import type { Abi } from "viem";

export const permissionedRegistryV2RoleMutationAbi = [
  {
    inputs: [
      {
        internalType: "uint64",
        name: "oldExpiry",
        type: "uint64",
      },
      {
        internalType: "uint64",
        name: "newExpiry",
        type: "uint64",
      },
    ],
    name: "CannotReduceExpiry",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
      },
    ],
    name: "CannotSetPastExpiry",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EACCannotGrantRoles",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EACCannotRevokeRoles",
    type: "error",
  },
  {
    inputs: [],
    name: "EACInvalidAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
    ],
    name: "EACInvalidRoleBitmap",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "EACMaxAssignees",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "EACMinAssignees",
    type: "error",
  },
  {
    inputs: [],
    name: "EACRootResourceNotAllowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EACUnauthorizedAccountRoles",
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
    name: "LabelAlreadyRegistered",
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
    name: "LabelAlreadyReserved",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "LabelExpired",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
    ],
    name: "TransferDisallowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRoles",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRoles",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const permissionedResolverV2RootRoleMutationAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EACCannotGrantRoles",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EACCannotRevokeRoles",
    type: "error",
  },
  {
    inputs: [],
    name: "EACInvalidAccount",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
    ],
    name: "EACInvalidRoleBitmap",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "EACMaxAssignees",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "role",
        type: "uint256",
      },
    ],
    name: "EACMinAssignees",
    type: "error",
  },
  {
    inputs: [],
    name: "EACRootResourceNotAllowed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "EACUnauthorizedAccountRoles",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "contentType",
        type: "uint256",
      },
    ],
    name: "InvalidContentType",
    type: "error",
  },
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
        internalType: "bytes4",
        name: "selector",
        type: "bytes4",
      },
    ],
    name: "UnsupportedResolverProfile",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRootRoles",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRootRoles",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
