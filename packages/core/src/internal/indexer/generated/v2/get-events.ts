/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
/** Filter criteria for querying events */
export type EventFilter = {
  /** Filter by block number greater than */
  readonly blockNumber_gt?: number | null | undefined;
  /** Filter by block number greater than or equal */
  readonly blockNumber_gte?: number | null | undefined;
  /** Filter by block number less than */
  readonly blockNumber_lt?: number | null | undefined;
  /** Filter by block number less than or equal */
  readonly blockNumber_lte?: number | null | undefined;
  /** Filter by contract address */
  readonly contractAddress?: string | null | undefined;
  /** Filter by domain name */
  readonly domain?: string | null | undefined;
  /** Filter by namehash */
  readonly namehash?: string | null | undefined;
  /** Filter by protocol (v1 or v2) */
  readonly protocol?: string | null | undefined;
  /** Filter by timestamp greater than */
  readonly timestamp_gt?: number | null | undefined;
  /** Filter by timestamp greater than or equal */
  readonly timestamp_gte?: number | null | undefined;
  /** Filter by timestamp less than */
  readonly timestamp_lt?: number | null | undefined;
  /** Filter by timestamp less than or equal */
  readonly timestamp_lte?: number | null | undefined;
  /** Filter by event type (e.g., 'Transfer', 'NameRegistered', 'TextChanged') */
  readonly type?: string | null | undefined;
  /** Filter by event type in list */
  readonly type_in?: ReadonlyArray<string> | null | undefined;
  /** Negated event-type match (subgraph parity). */
  readonly type_not?: string | null | undefined;
  /** Negated event-type-in-list (subgraph parity). */
  readonly type_not_in?: ReadonlyArray<string> | null | undefined;
};

/** Order direction for sorting */
export type OrderDirection = "asc" | "desc";

export type V2GetEventsQueryVariables = Exact<{
  first: number;
  after?: string | null | undefined;
  where: EventFilter;
  orderDirection: OrderDirection;
}>;

export type V2GetEventsQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly eventConnection: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly type: string;
        readonly protocol: string;
        readonly name: string | null;
        readonly namehash: string | null;
        readonly blockNumber: number;
        readonly timestamp: number;
        readonly transactionHash: string;
        readonly contractAddress: string;
        readonly data: string | null;
        readonly key: string | null;
        readonly value: string | null;
        readonly asAddressChanged: {
          readonly address: string | null;
          readonly coinType: number | null;
        } | null;
        readonly asExpiryUpdated: {
          readonly expiry: number | null;
          readonly node: string | null;
          readonly tokenId: string | null;
        } | null;
        readonly asFusesSet: { readonly fuses: number | null; readonly node: string | null } | null;
        readonly asLabelRegistered: {
          readonly expiry: number | null;
          readonly name: string | null;
          readonly owner: string | null;
          readonly registry: string | null;
          readonly sender: string | null;
          readonly tokenId: string | null;
        } | null;
        readonly asNameRegistered: {
          readonly baseCost: string | null;
          readonly cost: string | null;
          readonly expires: number | null;
          readonly label: string | null;
          readonly name: string | null;
          readonly owner: string | null;
          readonly premium: string | null;
          readonly referrer: string | null;
        } | null;
        readonly asNameRenewed: {
          readonly expires: number | null;
          readonly id: string | null;
        } | null;
        readonly asNameUnwrapped: {
          readonly node: string | null;
          readonly owner: string | null;
        } | null;
        readonly asNameWrapped: {
          readonly expiry: number | null;
          readonly fuses: number | null;
          readonly node: string | null;
          readonly owner: string | null;
        } | null;
        readonly asRegistryTransfer: {
          readonly node: string | null;
          readonly owner: string | null;
        } | null;
        readonly asResolverUpdated: {
          readonly resolver: string | null;
          readonly sender: string | null;
          readonly tokenId: string | null;
        } | null;
        readonly asReverseClaimed: {
          readonly address: string | null;
          readonly node: string | null;
        } | null;
        readonly asTextChanged: {
          readonly key: string | null;
          readonly value: string | null;
        } | null;
        readonly asTransfer: {
          readonly from: string | null;
          readonly id: string | null;
          readonly operator: string | null;
          readonly to: string | null;
          readonly value: string | null;
        } | null;
      };
    }>;
    readonly pageInfo: { readonly hasNextPage: boolean; readonly endCursor: string | null };
  };
};

export const V2GetEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetEvents" },
      variableDefinitions: [
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
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "EventFilter" } },
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
            name: { kind: "Name", value: "eventConnection" },
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
                value: { kind: "EnumValue", value: "blockNumber" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "Variable", name: { kind: "Name", value: "orderDirection" } },
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
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "type" } },
                            { kind: "Field", name: { kind: "Name", value: "protocol" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "namehash" } },
                            { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                            { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                            { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
                            { kind: "Field", name: { kind: "Name", value: "contractAddress" } },
                            { kind: "Field", name: { kind: "Name", value: "data" } },
                            { kind: "Field", name: { kind: "Name", value: "key" } },
                            { kind: "Field", name: { kind: "Name", value: "value" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asAddressChanged" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "address" } },
                                  { kind: "Field", name: { kind: "Name", value: "coinType" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asExpiryUpdated" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "expiry" } },
                                  { kind: "Field", name: { kind: "Name", value: "node" } },
                                  { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asFusesSet" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "fuses" } },
                                  { kind: "Field", name: { kind: "Name", value: "node" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asLabelRegistered" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "expiry" } },
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "owner" } },
                                  { kind: "Field", name: { kind: "Name", value: "registry" } },
                                  { kind: "Field", name: { kind: "Name", value: "sender" } },
                                  { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asNameRegistered" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "baseCost" } },
                                  { kind: "Field", name: { kind: "Name", value: "cost" } },
                                  { kind: "Field", name: { kind: "Name", value: "expires" } },
                                  { kind: "Field", name: { kind: "Name", value: "label" } },
                                  { kind: "Field", name: { kind: "Name", value: "name" } },
                                  { kind: "Field", name: { kind: "Name", value: "owner" } },
                                  { kind: "Field", name: { kind: "Name", value: "premium" } },
                                  { kind: "Field", name: { kind: "Name", value: "referrer" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asNameRenewed" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "expires" } },
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asNameUnwrapped" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "node" } },
                                  { kind: "Field", name: { kind: "Name", value: "owner" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asNameWrapped" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "expiry" } },
                                  { kind: "Field", name: { kind: "Name", value: "fuses" } },
                                  { kind: "Field", name: { kind: "Name", value: "node" } },
                                  { kind: "Field", name: { kind: "Name", value: "owner" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asRegistryTransfer" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "node" } },
                                  { kind: "Field", name: { kind: "Name", value: "owner" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asResolverUpdated" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "resolver" } },
                                  { kind: "Field", name: { kind: "Name", value: "sender" } },
                                  { kind: "Field", name: { kind: "Name", value: "tokenId" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asReverseClaimed" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "address" } },
                                  { kind: "Field", name: { kind: "Name", value: "node" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asTextChanged" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "key" } },
                                  { kind: "Field", name: { kind: "Name", value: "value" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "asTransfer" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "from" } },
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  { kind: "Field", name: { kind: "Name", value: "operator" } },
                                  { kind: "Field", name: { kind: "Name", value: "to" } },
                                  { kind: "Field", name: { kind: "Name", value: "value" } },
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetEventsQuery, V2GetEventsQueryVariables>;
