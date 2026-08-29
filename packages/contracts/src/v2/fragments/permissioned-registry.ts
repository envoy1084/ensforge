import type { Abi } from "viem";

const permissionedRegistryV2InterfaceErrors = [
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
] as const satisfies Abi;

export const permissionedRegistryV2InterfaceGetResourceAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "anyId",
        type: "uint256",
      },
    ],
    name: "getResource",
    outputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const permissionedRegistryV2InterfaceGetStateAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "anyId",
        type: "uint256",
      },
    ],
    name: "getState",
    outputs: [
      {
        components: [
          {
            internalType: "enum IPermissionedRegistry.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint64",
            name: "expiry",
            type: "uint64",
          },
          {
            internalType: "address",
            name: "latestOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "resource",
            type: "uint256",
          },
        ],
        internalType: "struct IPermissionedRegistry.State",
        name: "state",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const permissionedRegistryV2InterfaceGetSubregistryAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "string",
        name: "label",
        type: "string",
      },
    ],
    name: "getSubregistry",
    outputs: [
      {
        internalType: "contract IRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const permissionedRegistryV2InterfaceHasRolesAbi = [
  ...permissionedRegistryV2InterfaceErrors,
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
    name: "hasRoles",
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

export const permissionedRegistryV2InterfaceIsApprovedForAllAbi = [
  ...permissionedRegistryV2InterfaceErrors,
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

export const permissionedRegistryV2InterfaceRegisterAbi = [
  ...permissionedRegistryV2InterfaceErrors,
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
        internalType: "contract IRegistry",
        name: "registry",
        type: "address",
      },
      {
        internalType: "address",
        name: "resolver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "expiry",
        type: "uint64",
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

export const permissionedRegistryV2InterfaceRenewAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "anyId",
        type: "uint256",
      },
      {
        internalType: "uint64",
        name: "newExpiry",
        type: "uint64",
      },
    ],
    name: "renew",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const permissionedRegistryV2InterfaceRolesAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "roles",
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
] as const satisfies Abi;

export const permissionedRegistryV2InterfaceSafeTransferFromAbi = [
  ...permissionedRegistryV2InterfaceErrors,
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
        name: "value",
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

export const permissionedRegistryV2InterfaceSetResolverAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "anyId",
        type: "uint256",
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

export const permissionedRegistryV2InterfaceSetSubregistryAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "anyId",
        type: "uint256",
      },
      {
        internalType: "contract IRegistry",
        name: "registry",
        type: "address",
      },
    ],
    name: "setSubregistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;

export const permissionedRegistryV2InterfaceUnregisterAbi = [
  ...permissionedRegistryV2InterfaceErrors,
  {
    inputs: [
      {
        internalType: "uint256",
        name: "anyId",
        type: "uint256",
      },
    ],
    name: "unregister",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
