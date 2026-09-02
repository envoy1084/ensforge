/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V1IndexerStatusQueryVariables = Exact<{ [key: string]: never }>;

export type V1IndexerStatusQuery = {
  readonly _meta: {
    readonly deployment: string;
    readonly hasIndexingErrors: boolean;
    readonly block: {
      readonly number: number;
      readonly hash: `0x${string}` | null;
      readonly timestamp: number | null;
    };
  } | null;
};

export const V1IndexerStatusDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V1IndexerStatus" },
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
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "number" } },
                      { kind: "Field", name: { kind: "Name", value: "hash" } },
                      { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "deployment" } },
                { kind: "Field", name: { kind: "Name", value: "hasIndexingErrors" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V1IndexerStatusQuery, V1IndexerStatusQueryVariables>;
