/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V1GetIndexedRecordsQueryVariables = Exact<{
  id: string | number;
  domainId: string;
  first: number;
}>;

export type V1GetIndexedRecordsQuery = {
  readonly _meta: { readonly block: { readonly number: number } } | null;
  readonly domain: { readonly resolver: { readonly id: string } | null } | null;
  readonly resolvers: ReadonlyArray<{
    readonly id: string;
    readonly address: `0x${string}`;
    readonly texts: ReadonlyArray<string> | null;
    readonly coinTypes: ReadonlyArray<string> | null;
    readonly contentHash: `0x${string}` | null;
    readonly events: ReadonlyArray<
      | { readonly __typename: "AbiChanged"; readonly contentType: string }
      | { readonly __typename: "AddrChanged" }
      | {
          readonly __typename: "AuthorisationChanged";
          readonly owner: `0x${string}`;
          readonly target: `0x${string}`;
          readonly isAuthorized: boolean;
        }
      | { readonly __typename: "ContenthashChanged" }
      | {
          readonly __typename: "InterfaceChanged";
          readonly interfaceID: `0x${string}`;
          readonly implementer: `0x${string}`;
        }
      | { readonly __typename: "MulticoinAddrChanged" }
      | { readonly __typename: "NameChanged"; readonly name: string }
      | {
          readonly __typename: "PubkeyChanged";
          readonly x: `0x${string}`;
          readonly y: `0x${string}`;
        }
      | { readonly __typename: "TextChanged" }
      | { readonly __typename: "VersionChanged"; readonly version: string }
    >;
  }>;
};

export const V1GetIndexedRecordsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V1GetIndexedRecords" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "domainId" } },
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
                  name: { kind: "Name", value: "resolver" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolvers" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "domain" },
                      value: { kind: "Variable", name: { kind: "Name", value: "domainId" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "texts" } },
                { kind: "Field", name: { kind: "Name", value: "coinTypes" } },
                { kind: "Field", name: { kind: "Name", value: "contentHash" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "events" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "first" },
                      value: { kind: "IntValue", value: "1000" },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "orderBy" },
                      value: { kind: "EnumValue", value: "blockNumber" },
                    },
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "orderDirection" },
                      value: { kind: "EnumValue", value: "desc" },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "__typename" } },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "AbiChanged" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "contentType" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "AuthorisationChanged" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "owner" } },
                            { kind: "Field", name: { kind: "Name", value: "target" } },
                            { kind: "Field", name: { kind: "Name", value: "isAuthorized" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "InterfaceChanged" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "interfaceID" } },
                            { kind: "Field", name: { kind: "Name", value: "implementer" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "NameChanged" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "name" } }],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "PubkeyChanged" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "x" } },
                            { kind: "Field", name: { kind: "Name", value: "y" } },
                          ],
                        },
                      },
                      {
                        kind: "InlineFragment",
                        typeCondition: {
                          kind: "NamedType",
                          name: { kind: "Name", value: "VersionChanged" },
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [{ kind: "Field", name: { kind: "Name", value: "version" } }],
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
} as unknown as DocumentNode<V1GetIndexedRecordsQuery, V1GetIndexedRecordsQueryVariables>;
