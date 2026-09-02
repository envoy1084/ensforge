/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V2GetIndexedRecordsQueryVariables = Exact<{
  name: string;
  namehash: string;
  first: number;
  protocol?: string | null | undefined;
}>;

export type V2GetIndexedRecordsQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly byName: { readonly resolver: { readonly id: string } | null } | null;
  readonly byNamehash: { readonly resolver: { readonly id: string } | null } | null;
  readonly resolvers: ReadonlyArray<{
    readonly id: string;
    readonly address: string;
    readonly texts: ReadonlyArray<string> | null;
    readonly coinTypes: ReadonlyArray<string> | null;
    readonly contentHash: string | null;
    readonly abis: ReadonlyArray<number> | null;
    readonly reverseName: string | null;
    readonly version: number | null;
    readonly pubkey: { readonly x: string; readonly y: string } | null;
    readonly interfaces: ReadonlyArray<{ readonly interfaceId: string }> | null;
  }>;
};

export const V2GetIndexedRecordsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetIndexedRecords" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "namehash" } },
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
          variable: { kind: "Variable", name: { kind: "Name", value: "protocol" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
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
            alias: { kind: "Name", value: "byName" },
            name: { kind: "Name", value: "domain" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "name" } },
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
            alias: { kind: "Name", value: "byNamehash" },
            name: { kind: "Name", value: "domain" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "namehash" } },
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
                      name: { kind: "Name", value: "namehash" },
                      value: { kind: "Variable", name: { kind: "Name", value: "namehash" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "protocol" },
                      value: { kind: "Variable", name: { kind: "Name", value: "protocol" } },
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
                { kind: "Field", name: { kind: "Name", value: "abis" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "pubkey" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "x" } },
                      { kind: "Field", name: { kind: "Name", value: "y" } },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "interfaces" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "interfaceId" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "reverseName" } },
                { kind: "Field", name: { kind: "Name", value: "version" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetIndexedRecordsQuery, V2GetIndexedRecordsQueryVariables>;
