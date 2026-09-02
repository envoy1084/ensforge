/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V2GetResolversForAddressQueryVariables = Exact<{
  owner: string;
  protocol?: string | null | undefined;
}>;

export type V2GetResolversForAddressQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly resolversByOwner: ReadonlyArray<{
    readonly address: string;
    readonly nodeCount: number;
    readonly roleHolderCount: number;
    readonly aliases: ReadonlyArray<{ readonly fromName: string; readonly toName: string }>;
  }>;
};

export const V2GetResolversForAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetResolversForAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "owner" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
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
            name: { kind: "Name", value: "resolversByOwner" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "account" },
                value: { kind: "Variable", name: { kind: "Name", value: "owner" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "protocol" },
                value: { kind: "Variable", name: { kind: "Name", value: "protocol" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "nodeCount" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "aliases" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "fromName" } },
                      { kind: "Field", name: { kind: "Name", value: "toName" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "roleHolderCount" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetResolversForAddressQuery, V2GetResolversForAddressQueryVariables>;
