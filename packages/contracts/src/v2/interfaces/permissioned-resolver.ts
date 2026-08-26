/** Complete IPermissionedResolver ABI from ENSv2. */
export const permissionedResolverV2InterfaceAbi = [
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes",
        name: "indexedFromName",
        type: "bytes",
      },
      {
        indexed: true,
        internalType: "bytes",
        name: "indexedToName",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "fromName",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "toName",
        type: "bytes",
      },
    ],
    name: "AliasChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldRoleBitmap",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newRoleBitmap",
        type: "uint256",
      },
    ],
    name: "EACRolesChanged",
    type: "event",
  },
  {
    inputs: [],
    name: "ROOT_RESOURCE",
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
    inputs: [
      {
        internalType: "bytes",
        name: "fromName",
        type: "bytes",
      },
    ],
    name: "getAlias",
    outputs: [
      {
        internalType: "bytes",
        name: "toName",
        type: "bytes",
      },
    ],
    stateMutability: "view",
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
    ],
    name: "getAssigneeCount",
    outputs: [
      {
        internalType: "uint256",
        name: "counts",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "mask",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        name: "resource",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "roleBitmap",
        type: "uint256",
      },
    ],
    name: "hasAssignees",
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
    name: "hasRootRoles",
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
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "resolve",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "resource",
        type: "uint256",
      },
    ],
    name: "roleCount",
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
  {
    inputs: [
      {
        internalType: "bytes",
        name: "fromName",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "toName",
        type: "bytes",
      },
    ],
    name: "setAlias",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
