/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V2IndexedNameFieldsFragment = {
  readonly id: string;
  readonly protocol: string;
  readonly name: string | null;
  readonly labelName: string | null;
  readonly labelhash: string;
  readonly createdAt: number;
  readonly expiryDate: number | null;
  readonly subdomainCount: number;
  readonly isMigrated: boolean;
  readonly ttl: number | null;
  readonly canonicalId: string | null;
  readonly tokenId: string | null;
  readonly tokenVersion: number | null;
  readonly registrationDate: number | null;
  readonly gracePeriodEnd: number | null;
  readonly unreachableSince: number | null;
  readonly isNormalized: boolean;
  readonly isReachable: boolean;
  readonly isWrapped: boolean;
  readonly roleHolderCount: number;
  readonly parent: {
    readonly id: string;
    readonly subregistry: { readonly address: string } | null;
  } | null;
  readonly owner: { readonly id: string };
  readonly registrant: { readonly id: string } | null;
  readonly resolvedAddress: { readonly id: string } | null;
  readonly resolver: { readonly address: string } | null;
  readonly wrappedOwner: { readonly id: string } | null;
  readonly wrappedDomain: {
    readonly fuses: number | null;
    readonly expiryDate: number | null;
    readonly owner: { readonly id: string } | null;
  } | null;
  readonly subregistry: { readonly address: string } | null;
};

export type V2GetNamesForAddressQueryVariables = Exact<{
  address: string;
  first: number;
  ownerAfter?: string | null | undefined;
  resolvedAfter?: string | null | undefined;
  registrationAfter?: string | null | undefined;
  roleAfter?: string | null | undefined;
  includeUnreachable?: boolean | null | undefined;
}>;

export type V2GetNamesForAddressQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly owned: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly protocol: string;
        readonly name: string | null;
        readonly labelName: string | null;
        readonly labelhash: string;
        readonly createdAt: number;
        readonly expiryDate: number | null;
        readonly subdomainCount: number;
        readonly isMigrated: boolean;
        readonly ttl: number | null;
        readonly canonicalId: string | null;
        readonly tokenId: string | null;
        readonly tokenVersion: number | null;
        readonly registrationDate: number | null;
        readonly gracePeriodEnd: number | null;
        readonly unreachableSince: number | null;
        readonly isNormalized: boolean;
        readonly isReachable: boolean;
        readonly isWrapped: boolean;
        readonly roleHolderCount: number;
        readonly parent: {
          readonly id: string;
          readonly subregistry: { readonly address: string } | null;
        } | null;
        readonly owner: { readonly id: string };
        readonly registrant: { readonly id: string } | null;
        readonly resolvedAddress: { readonly id: string } | null;
        readonly resolver: { readonly address: string } | null;
        readonly wrappedOwner: { readonly id: string } | null;
        readonly wrappedDomain: {
          readonly fuses: number | null;
          readonly expiryDate: number | null;
          readonly owner: { readonly id: string } | null;
        } | null;
        readonly subregistry: { readonly address: string } | null;
      };
    }>;
    readonly pageInfo: { readonly hasNextPage: boolean; readonly endCursor: string | null };
  };
  readonly resolved: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly protocol: string;
        readonly name: string | null;
        readonly labelName: string | null;
        readonly labelhash: string;
        readonly createdAt: number;
        readonly expiryDate: number | null;
        readonly subdomainCount: number;
        readonly isMigrated: boolean;
        readonly ttl: number | null;
        readonly canonicalId: string | null;
        readonly tokenId: string | null;
        readonly tokenVersion: number | null;
        readonly registrationDate: number | null;
        readonly gracePeriodEnd: number | null;
        readonly unreachableSince: number | null;
        readonly isNormalized: boolean;
        readonly isReachable: boolean;
        readonly isWrapped: boolean;
        readonly roleHolderCount: number;
        readonly parent: {
          readonly id: string;
          readonly subregistry: { readonly address: string } | null;
        } | null;
        readonly owner: { readonly id: string };
        readonly registrant: { readonly id: string } | null;
        readonly resolvedAddress: { readonly id: string } | null;
        readonly resolver: { readonly address: string } | null;
        readonly wrappedOwner: { readonly id: string } | null;
        readonly wrappedDomain: {
          readonly fuses: number | null;
          readonly expiryDate: number | null;
          readonly owner: { readonly id: string } | null;
        } | null;
        readonly subregistry: { readonly address: string } | null;
      };
    }>;
    readonly pageInfo: { readonly hasNextPage: boolean; readonly endCursor: string | null };
  };
  readonly registrations: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly domain: {
          readonly id: string;
          readonly protocol: string;
          readonly name: string | null;
          readonly labelName: string | null;
          readonly labelhash: string;
          readonly createdAt: number;
          readonly expiryDate: number | null;
          readonly subdomainCount: number;
          readonly isMigrated: boolean;
          readonly ttl: number | null;
          readonly canonicalId: string | null;
          readonly tokenId: string | null;
          readonly tokenVersion: number | null;
          readonly registrationDate: number | null;
          readonly gracePeriodEnd: number | null;
          readonly unreachableSince: number | null;
          readonly isNormalized: boolean;
          readonly isReachable: boolean;
          readonly isWrapped: boolean;
          readonly roleHolderCount: number;
          readonly parent: {
            readonly id: string;
            readonly subregistry: { readonly address: string } | null;
          } | null;
          readonly owner: { readonly id: string };
          readonly registrant: { readonly id: string } | null;
          readonly resolvedAddress: { readonly id: string } | null;
          readonly resolver: { readonly address: string } | null;
          readonly wrappedOwner: { readonly id: string } | null;
          readonly wrappedDomain: {
            readonly fuses: number | null;
            readonly expiryDate: number | null;
            readonly owner: { readonly id: string } | null;
          } | null;
          readonly subregistry: { readonly address: string } | null;
        };
      };
    }>;
    readonly pageInfo: { readonly hasNextPage: boolean; readonly endCursor: string | null };
  };
  readonly roles: {
    readonly edges: ReadonlyArray<{ readonly node: { readonly name: string | null } }>;
    readonly pageInfo: { readonly hasNextPage: boolean; readonly endCursor: string | null };
  };
};

export const V2IndexedNameFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2IndexedNameFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Domain" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "labelName" } },
          { kind: "Field", name: { kind: "Name", value: "labelhash" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "parent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subregistry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "registrant" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolvedAddress" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolver" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "subdomainCount" } },
          { kind: "Field", name: { kind: "Name", value: "isMigrated" } },
          { kind: "Field", name: { kind: "Name", value: "ttl" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedOwner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "fuses" } },
                { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "subregistry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "canonicalId" } },
          { kind: "Field", name: { kind: "Name", value: "tokenId" } },
          { kind: "Field", name: { kind: "Name", value: "tokenVersion" } },
          { kind: "Field", name: { kind: "Name", value: "registrationDate" } },
          { kind: "Field", name: { kind: "Name", value: "gracePeriodEnd" } },
          { kind: "Field", name: { kind: "Name", value: "unreachableSince" } },
          { kind: "Field", name: { kind: "Name", value: "isNormalized" } },
          { kind: "Field", name: { kind: "Name", value: "isReachable" } },
          { kind: "Field", name: { kind: "Name", value: "isWrapped" } },
          { kind: "Field", name: { kind: "Name", value: "roleHolderCount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2IndexedNameFieldsFragment, unknown>;
export const V2GetNamesForAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetNamesForAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "ownerAfter" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "resolvedAfter" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "registrationAfter" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "roleAfter" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "includeUnreachable" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "Boolean" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "_meta" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "block" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "number" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "owned" },
            name: { kind: "Name", value: "domainConnection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "ownerAfter" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "owner" },
                      value: { kind: "Variable", name: { kind: "Name", value: "address" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "includeUnreachable" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "includeUnreachable" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "V2IndexedNameFields" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "resolved" },
            name: { kind: "Name", value: "domainConnection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "resolvedAfter" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "resolvedAddress" },
                      value: { kind: "Variable", name: { kind: "Name", value: "address" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "includeUnreachable" },
                      value: {
                        kind: "Variable",
                        name: { kind: "Name", value: "includeUnreachable" },
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "FragmentSpread",
                              name: { kind: "Name", value: "V2IndexedNameFields" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "registrations" },
            name: { kind: "Name", value: "registrationConnection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "registrationAfter" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "registrant" },
                      value: { kind: "Variable", name: { kind: "Name", value: "address" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "domain" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  {
                                    kind: "FragmentSpread",
                                    name: { kind: "Name", value: "V2IndexedNameFields" },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "roles" },
            name: { kind: "Name", value: "roleConnection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "roleAfter" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "account" },
                value: { kind: "Variable", name: { kind: "Name", value: "address" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2IndexedNameFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Domain" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "protocol" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "labelName" } },
          { kind: "Field", name: { kind: "Name", value: "labelhash" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "parent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subregistry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "registrant" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolvedAddress" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolver" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "subdomainCount" } },
          { kind: "Field", name: { kind: "Name", value: "isMigrated" } },
          { kind: "Field", name: { kind: "Name", value: "ttl" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedOwner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "fuses" } },
                { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "subregistry" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "canonicalId" } },
          { kind: "Field", name: { kind: "Name", value: "tokenId" } },
          { kind: "Field", name: { kind: "Name", value: "tokenVersion" } },
          { kind: "Field", name: { kind: "Name", value: "registrationDate" } },
          { kind: "Field", name: { kind: "Name", value: "gracePeriodEnd" } },
          { kind: "Field", name: { kind: "Name", value: "unreachableSince" } },
          { kind: "Field", name: { kind: "Name", value: "isNormalized" } },
          { kind: "Field", name: { kind: "Name", value: "isReachable" } },
          { kind: "Field", name: { kind: "Name", value: "isWrapped" } },
          { kind: "Field", name: { kind: "Name", value: "roleHolderCount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetNamesForAddressQuery, V2GetNamesForAddressQueryVariables>;
