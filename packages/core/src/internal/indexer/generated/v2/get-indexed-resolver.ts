/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V2ResolverBindingFieldsFragment = {
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
  readonly domain: { readonly id: string; readonly name: string | null } | null;
};

export type V2GetIndexedResolverQueryVariables = Exact<{
  address: string;
  protocol?: string | null | undefined;
  first: number;
}>;

export type V2GetIndexedResolverQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly detail: {
    readonly address: string;
    readonly nodeCount: number;
    readonly aliasCount: number;
    readonly roleHolderCount: number;
    readonly aliases: ReadonlyArray<{ readonly fromName: string; readonly toName: string }>;
    readonly roles: ReadonlyArray<{
      readonly account: string;
      readonly resource: string;
      readonly name: string | null;
      readonly roleBitmap: string;
      readonly timestamp: number;
    }>;
  } | null;
  readonly bindings: ReadonlyArray<{
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
    readonly domain: { readonly id: string; readonly name: string | null } | null;
  }>;
};

export type V2GetIndexedResolverBindingQueryVariables = Exact<{
  address: string;
  protocol?: string | null | undefined;
  namehash: string;
}>;

export type V2GetIndexedResolverBindingQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly detail: {
    readonly address: string;
    readonly nodeCount: number;
    readonly aliasCount: number;
    readonly roleHolderCount: number;
    readonly aliases: ReadonlyArray<{ readonly fromName: string; readonly toName: string }>;
    readonly roles: ReadonlyArray<{
      readonly account: string;
      readonly resource: string;
      readonly name: string | null;
      readonly roleBitmap: string;
      readonly timestamp: number;
    }>;
  } | null;
  readonly bindings: ReadonlyArray<{
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
    readonly domain: { readonly id: string; readonly name: string | null } | null;
  }>;
};

export const V2ResolverBindingFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2ResolverBindingFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Resolver" } },
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
} as unknown as DocumentNode<V2ResolverBindingFieldsFragment, unknown>;
export const V2GetIndexedResolverDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetIndexedResolver" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
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
            alias: { kind: "Name", value: "detail" },
            name: { kind: "Name", value: "resolver" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "address" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "nodeCount" } },
                { kind: "Field", name: { kind: "Name", value: "aliasCount" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "account" } },
                      { kind: "Field", name: { kind: "Name", value: "resource" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "roleBitmap" } },
                      { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "bindings" },
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
                {
                  kind: "FragmentSpread",
                  name: { kind: "Name", value: "V2ResolverBindingFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2ResolverBindingFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Resolver" } },
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
} as unknown as DocumentNode<V2GetIndexedResolverQuery, V2GetIndexedResolverQueryVariables>;
export const V2GetIndexedResolverBindingDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetIndexedResolverBinding" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
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
            alias: { kind: "Name", value: "detail" },
            name: { kind: "Name", value: "resolver" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: { kind: "Variable", name: { kind: "Name", value: "address" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "address" } },
                { kind: "Field", name: { kind: "Name", value: "nodeCount" } },
                { kind: "Field", name: { kind: "Name", value: "aliasCount" } },
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
                {
                  kind: "Field",
                  name: { kind: "Name", value: "roles" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "account" } },
                      { kind: "Field", name: { kind: "Name", value: "resource" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      { kind: "Field", name: { kind: "Name", value: "roleBitmap" } },
                      { kind: "Field", name: { kind: "Name", value: "timestamp" } },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: "Field",
            alias: { kind: "Name", value: "bindings" },
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
                      name: { kind: "Name", value: "protocol" },
                      value: { kind: "Variable", name: { kind: "Name", value: "protocol" } },
                    },
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "namehash" },
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
                  name: { kind: "Name", value: "V2ResolverBindingFields" },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2ResolverBindingFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Resolver" } },
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
  V2GetIndexedResolverBindingQuery,
  V2GetIndexedResolverBindingQueryVariables
>;
