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

export type V2GetRecordHistoryQueryVariables = Exact<{
  first: number;
  after?: string | null | undefined;
  where: EventFilter;
  orderDirection: OrderDirection;
}>;

export type V2GetRecordHistoryQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly eventConnection: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly type: string;
        readonly protocol: string;
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
        readonly asTextChanged: {
          readonly key: string | null;
          readonly value: string | null;
        } | null;
      };
    }>;
    readonly pageInfo: { readonly hasNextPage: boolean; readonly endCursor: string | null };
  };
};

export const V2GetRecordHistoryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetRecordHistory" },
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
                              name: { kind: "Name", value: "asTextChanged" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "key" } },
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
} as unknown as DocumentNode<V2GetRecordHistoryQuery, V2GetRecordHistoryQueryVariables>;
