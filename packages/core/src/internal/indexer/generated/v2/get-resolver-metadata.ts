/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V2GetResolverMetadataQueryVariables = Exact<{
  resolver: string;
}>;

export type V2GetResolverMetadataQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly metadata: {
    readonly id: string;
    readonly resolver: string;
    readonly graphqlUrl: string;
    readonly blockNumber: number;
    readonly timestamp: number;
    readonly transactionHash: string;
  } | null;
};

export const V2GetResolverMetadataDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetResolverMetadata" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "resolver" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
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
            name: { kind: "Name", value: "metadata" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "resolver" },
                value: { kind: "Variable", name: { kind: "Name", value: "resolver" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "resolver" } },
                { kind: "Field", name: { kind: "Name", value: "graphqlUrl" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetResolverMetadataQuery, V2GetResolverMetadataQueryVariables>;
