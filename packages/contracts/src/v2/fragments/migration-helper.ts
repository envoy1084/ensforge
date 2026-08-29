import type { Abi } from "viem";

const migrationHelperV2Errors = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "dns",
        type: "bytes",
      },
    ],
    name: "DNSDecodingFailed",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nft",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "NotApprovedOperator",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "name",
        type: "bytes",
      },
    ],
    name: "ParentNotMigrated",
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
    name: "WrappedOwnerMismatch",
    type: "error",
  },
] as const satisfies Abi;

export const migrationHelperV2NameWrapperAbi = [
  ...migrationHelperV2Errors,
  {
    inputs: [],
    name: "NAME_WRAPPER",
    outputs: [
      {
        internalType: "contract INameWrapper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const satisfies Abi;

export const migrationHelperV2MigrateAbi = [
  ...migrationHelperV2Errors,
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
            internalType: "address",
            name: "owner",
            type: "address",
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
        ],
        internalType: "struct LibMigration.Data[]",
        name: "unwrapped",
        type: "tuple[]",
      },
      {
        components: [
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
            name: "subregistry",
            type: "address",
          },
          {
            internalType: "address",
            name: "resolver",
            type: "address",
          },
        ],
        internalType: "struct LibMigration.Data[][]",
        name: "unlockedGroups",
        type: "tuple[][]",
      },
      {
        components: [
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
            name: "subregistry",
            type: "address",
          },
          {
            internalType: "address",
            name: "resolver",
            type: "address",
          },
        ],
        internalType: "struct LibMigration.Data[][]",
        name: "lockedGroups",
        type: "tuple[][]",
      },
      {
        components: [
          {
            internalType: "bytes",
            name: "parentName",
            type: "bytes",
          },
          {
            components: [
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
                name: "subregistry",
                type: "address",
              },
              {
                internalType: "address",
                name: "resolver",
                type: "address",
              },
            ],
            internalType: "struct LibMigration.Data[][]",
            name: "groups",
            type: "tuple[][]",
          },
        ],
        internalType: "struct LockedChildren[]",
        name: "lockedChildrenGroups",
        type: "tuple[]",
      },
    ],
    name: "migrate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const satisfies Abi;
