/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
/** Nested-relation filter on Account (subgraph parity). Used inside `DomainFilter.owner_`. */
export type AccountFilter = {
  /** Match account by exact id (address). */
  readonly id?: string | null | undefined;
  /** Match account by id in list. */
  readonly id_in?: ReadonlyArray<string> | null | undefined;
};

/** Filter criteria for querying domains */
export type DomainFilter = {
  /** Subgraph-compatible alias for `expiry_gt`. */
  readonly expiryDate_gt?: number | null | undefined;
  /** Subgraph-compatible alias for `expiry_gte`. */
  readonly expiryDate_gte?: number | null | undefined;
  /** Subgraph-compatible alias for `expiry_lt`. */
  readonly expiryDate_lt?: number | null | undefined;
  /** Subgraph-compatible alias for `expiry_lte`. */
  readonly expiryDate_lte?: number | null | undefined;
  /** Filter by expiry date greater than (Unix timestamp) */
  readonly expiry_gt?: number | null | undefined;
  /** Filter by expiry date greater than or equal (Unix timestamp) */
  readonly expiry_gte?: number | null | undefined;
  /** Filter by expiry date less than (Unix timestamp) */
  readonly expiry_lt?: number | null | undefined;
  /** Filter by expiry date less than or equal (Unix timestamp) */
  readonly expiry_lte?: number | null | undefined;
  /** Filter by whether domain has direct subdomains (one level only) */
  readonly hasSubdomains?: boolean | null | undefined;
  /**
   * Include domains that are unreachable via canonical resolution
   *   (orphaned by subregistry repoints, label unregistration, or expired
   *   ancestors). Default false — set true for audit / debug queries.
   */
  readonly includeUnreachable?: boolean | null | undefined;
  /** Filter by migration status */
  readonly isMigrated?: boolean | null | undefined;
  /** Exact match on leftmost label (subgraph parity). */
  readonly labelName?: string | null | undefined;
  /** Partial label match (contains). */
  readonly labelName_contains?: string | null | undefined;
  /** Case-insensitive partial label match. */
  readonly labelName_contains_nocase?: string | null | undefined;
  /** Label ends with suffix. */
  readonly labelName_ends_with?: string | null | undefined;
  /** Case-insensitive label-suffix match. */
  readonly labelName_ends_with_nocase?: string | null | undefined;
  /** Label in list (up to 1000 labels). */
  readonly labelName_in?: ReadonlyArray<string> | null | undefined;
  /** Negated exact-label match. */
  readonly labelName_not?: string | null | undefined;
  /** Negated partial label match. */
  readonly labelName_not_contains?: string | null | undefined;
  /** Negated label-in-list (up to 1000 labels). */
  readonly labelName_not_in?: ReadonlyArray<string> | null | undefined;
  /** Label starts with prefix. */
  readonly labelName_starts_with?: string | null | undefined;
  /** Case-insensitive label-prefix match. */
  readonly labelName_starts_with_nocase?: string | null | undefined;
  /** Exact name match */
  readonly name?: string | null | undefined;
  /** Partial name match (contains) */
  readonly name_contains?: string | null | undefined;
  /** Case-insensitive partial name match */
  readonly name_contains_nocase?: string | null | undefined;
  /** Name ends with suffix */
  readonly name_ends_with?: string | null | undefined;
  /** Case-insensitive suffix match (subgraph parity). */
  readonly name_ends_with_nocase?: string | null | undefined;
  /** Filter by name in list (up to 1000 names) */
  readonly name_in?: ReadonlyArray<string> | null | undefined;
  /** Negated exact-name match (subgraph parity). */
  readonly name_not?: string | null | undefined;
  /** Negated partial name match (subgraph parity). */
  readonly name_not_contains?: string | null | undefined;
  /** Negated name-in-list (subgraph parity, up to 1000 names). */
  readonly name_not_in?: ReadonlyArray<string> | null | undefined;
  /** Name starts with prefix */
  readonly name_starts_with?: string | null | undefined;
  /** Case-insensitive prefix match (subgraph parity). */
  readonly name_starts_with_nocase?: string | null | undefined;
  /** Filter by owner address */
  readonly owner?: string | null | undefined;
  /** Nested-relation filter on owner Account (subgraph parity). E.g. `{owner_: {id_in: [...]}}`. */
  readonly owner_?: AccountFilter | null | undefined;
  /** Filter by owner address in list */
  readonly owner_in?: ReadonlyArray<string> | null | undefined;
  /** Negated owner address match (subgraph parity). */
  readonly owner_not?: string | null | undefined;
  /** Negated owner-in-list (subgraph parity). */
  readonly owner_not_in?: ReadonlyArray<string> | null | undefined;
  /** Filter by resolved address */
  readonly resolvedAddress?: string | null | undefined;
  /** Filter by resolver contract address */
  readonly resolver?: string | null | undefined;
  /** Filter by direct subdomain count greater than (one level only) */
  readonly subdomainCount_gt?: number | null | undefined;
  /** Filter by direct subdomain count less than (one level only) */
  readonly subdomainCount_lt?: number | null | undefined;
};

/** Fields to order Domain results by */
export type Domain_OrderBy = "createdAt" | "expiryDate" | "id" | "name" | "registrationDate";

/** Order direction for sorting */
export type OrderDirection = "asc" | "desc";

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

export type V2GetSubnamesQueryVariables = Exact<{
  id: string;
  first: number;
  after?: string | null | undefined;
  where?: DomainFilter | null | undefined;
  orderBy: Domain_OrderBy;
  orderDirection: OrderDirection;
}>;

export type V2GetSubnamesQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly domain: {
    readonly subregistry: {
      readonly labelConnection: {
        readonly edges: ReadonlyArray<{
          readonly cursor: string;
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
    } | null;
  } | null;
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
export const V2GetSubnamesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetSubnames" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "where" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "DomainFilter" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderBy" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Domain_orderBy" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderDirection" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "OrderDirection" } },
          },
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
            name: { kind: "Name", value: "domain" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "subregistry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "labelConnection" },
                        arguments: [
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "first" },
                            value: { kind: "Variable", name: { kind: "Name", value: "first" } },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "after" },
                            value: { kind: "Variable", name: { kind: "Name", value: "after" } },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "where" },
                            value: { kind: "Variable", name: { kind: "Name", value: "where" } },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "orderBy" },
                            value: { kind: "Variable", name: { kind: "Name", value: "orderBy" } },
                          },
                          {
                            kind: "Argument",
                            name: { kind: "Name", value: "orderDirection" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "orderDirection" },
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
                                  { kind: "Field", name: { kind: "Name", value: "cursor" } },
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
} as unknown as DocumentNode<V2GetSubnamesQuery, V2GetSubnamesQueryVariables>;
