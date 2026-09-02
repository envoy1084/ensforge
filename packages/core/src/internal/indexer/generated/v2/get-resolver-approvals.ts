/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V2GetResolverApprovalsQueryVariables = Exact<{
  delegate?: string | null | undefined;
  namehash?: string | null | undefined;
}>;

export type V2GetResolverApprovalsQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly approvals: ReadonlyArray<{
    readonly id: string;
    readonly resolver: string;
    readonly namehash: string;
    readonly context: string | null;
    readonly delegate: string;
    readonly approved: boolean;
    readonly blockNumber: number;
    readonly timestamp: number;
    readonly transactionHash: string;
    readonly logIndex: number;
  }>;
};

export const V2GetResolverApprovalsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetResolverApprovals" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "delegate" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "namehash" } },
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
            name: { kind: "Name", value: "approvals" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "delegate" },
                value: { kind: "Variable", name: { kind: "Name", value: "delegate" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "namehash" },
                value: { kind: "Variable", name: { kind: "Name", value: "namehash" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "resolver" } },
                { kind: "Field", name: { kind: "Name", value: "namehash" } },
                { kind: "Field", name: { kind: "Name", value: "context" } },
                { kind: "Field", name: { kind: "Name", value: "delegate" } },
                { kind: "Field", name: { kind: "Name", value: "approved" } },
                { kind: "Field", name: { kind: "Name", value: "blockNumber" } },
                { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                { kind: "Field", name: { kind: "Name", value: "transactionHash" } },
                { kind: "Field", name: { kind: "Name", value: "logIndex" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetResolverApprovalsQuery, V2GetResolverApprovalsQueryVariables>;
