/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V1GetLabelQueryVariables = Exact<{
  labelhash: string;
}>;

export type V1GetLabelQuery = {
  readonly _meta: { readonly block: { readonly number: number } } | null;
  readonly domains: ReadonlyArray<{
    readonly labelName: string | null;
    readonly labelhash: `0x${string}` | null;
  }>;
};

export const V1GetLabelDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V1GetLabel" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "labelhash" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Bytes" } },
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
            name: { kind: "Name", value: "domains" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "IntValue", value: "1" },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "labelhash" },
                      value: { kind: "Variable", name: { kind: "Name", value: "labelhash" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "labelName_not" },
                      value: { kind: "NullValue" },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "labelName" } },
                { kind: "Field", name: { kind: "Name", value: "labelhash" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V1GetLabelQuery, V1GetLabelQueryVariables>;
