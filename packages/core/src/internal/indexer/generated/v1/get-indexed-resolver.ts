/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V1ResolverBindingFieldsFragment = {
  readonly id: string;
  readonly address: `0x${string}`;
  readonly texts: ReadonlyArray<string> | null;
  readonly coinTypes: ReadonlyArray<string> | null;
  readonly contentHash: `0x${string}` | null;
  readonly domain: { readonly id: string; readonly name: string | null } | null;
};

export type V1GetIndexedResolverQueryVariables = Exact<{
  address: string;
  first: number;
}>;

export type V1GetIndexedResolverQuery = {
  readonly _meta: { readonly block: { readonly number: number } } | null;
  readonly resolvers: ReadonlyArray<{
    readonly id: string;
    readonly address: `0x${string}`;
    readonly texts: ReadonlyArray<string> | null;
    readonly coinTypes: ReadonlyArray<string> | null;
    readonly contentHash: `0x${string}` | null;
    readonly domain: { readonly id: string; readonly name: string | null } | null;
  }>;
};

export type V1GetIndexedResolverBindingQueryVariables = Exact<{
  address: string;
  namehash: string;
}>;

export type V1GetIndexedResolverBindingQuery = {
  readonly _meta: { readonly block: { readonly number: number } } | null;
  readonly resolvers: ReadonlyArray<{
    readonly id: string;
    readonly address: `0x${string}`;
    readonly texts: ReadonlyArray<string> | null;
    readonly coinTypes: ReadonlyArray<string> | null;
    readonly contentHash: `0x${string}` | null;
    readonly domain: { readonly id: string; readonly name: string | null } | null;
  }>;
};

export const V1ResolverBindingFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V1ResolverBindingFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Resolver" } },
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
            name: { kind: "Name", value: "domain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V1ResolverBindingFieldsFragment, unknown>;
export const V1GetIndexedResolverDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V1GetIndexedResolver" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Bytes" } },
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
                      name: { kind: "Name", value: "address" },
                      value: { kind: "Variable", name: { kind: "Name", value: "address" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "V1ResolverBindingFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V1ResolverBindingFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Resolver" } },
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
            name: { kind: "Name", value: "domain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V1GetIndexedResolverQuery, V1GetIndexedResolverQueryVariables>;
export const V1GetIndexedResolverBindingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V1GetIndexedResolverBinding" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Bytes" } },
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
            name: { kind: "Name", value: "resolvers" },
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
                      name: { kind: "Name", value: "address" },
                      value: { kind: "Variable", name: { kind: "Name", value: "address" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "domain" },
                      value: { kind: "Variable", name: { kind: "Name", value: "namehash" } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "V1ResolverBindingFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V1ResolverBindingFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Resolver" } },
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
            name: { kind: "Name", value: "domain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  V1GetIndexedResolverBindingQuery,
  V1GetIndexedResolverBindingQueryVariables
>;
