/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V2RegistryFieldsFragment = {
  readonly address: string;
  readonly name: string;
  readonly namehash: string;
  readonly parentRegistry: string;
  readonly createdAt: number;
  readonly createdBlock: number;
  readonly labelCount: number;
  readonly referencedByCount: number;
  readonly roleCount: number;
  readonly eventCount: number;
  readonly owner: { readonly id: string } | null;
};

export type V2GetRegistryByAddressQueryVariables = Exact<{
  address: string;
}>;

export type V2GetRegistryByAddressQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly registry: {
    readonly address: string;
    readonly name: string;
    readonly namehash: string;
    readonly parentRegistry: string;
    readonly createdAt: number;
    readonly createdBlock: number;
    readonly labelCount: number;
    readonly referencedByCount: number;
    readonly roleCount: number;
    readonly eventCount: number;
    readonly owner: { readonly id: string } | null;
  } | null;
};

export type V2GetRegistryByNameQueryVariables = Exact<{
  name: string;
}>;

export type V2GetRegistryByNameQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly domain: {
    readonly subregistry: {
      readonly address: string;
      readonly name: string;
      readonly namehash: string;
      readonly parentRegistry: string;
      readonly createdAt: number;
      readonly createdBlock: number;
      readonly labelCount: number;
      readonly referencedByCount: number;
      readonly roleCount: number;
      readonly eventCount: number;
      readonly owner: { readonly id: string } | null;
    } | null;
  } | null;
};

export const V2RegistryFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2RegistryFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RegistryInfo" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "address" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "namehash" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "parentRegistry" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdBlock" } },
          { kind: "Field", name: { kind: "Name", value: "labelCount" } },
          { kind: "Field", name: { kind: "Name", value: "referencedByCount" } },
          { kind: "Field", name: { kind: "Name", value: "roleCount" } },
          { kind: "Field", name: { kind: "Name", value: "eventCount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2RegistryFieldsFragment, unknown>;
export const V2GetRegistryByAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetRegistryByAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "address" } },
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
            name: { kind: "Name", value: "registry" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "address" },
                value: { kind: "Variable", name: { kind: "Name", value: "address" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "V2RegistryFields" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2RegistryFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RegistryInfo" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "address" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "namehash" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "parentRegistry" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdBlock" } },
          { kind: "Field", name: { kind: "Name", value: "labelCount" } },
          { kind: "Field", name: { kind: "Name", value: "referencedByCount" } },
          { kind: "Field", name: { kind: "Name", value: "roleCount" } },
          { kind: "Field", name: { kind: "Name", value: "eventCount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetRegistryByAddressQuery, V2GetRegistryByAddressQueryVariables>;
export const V2GetRegistryByNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetRegistryByName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
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
                  name: { kind: "Name", value: "subregistry" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "FragmentSpread", name: { kind: "Name", value: "V2RegistryFields" } },
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
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V2RegistryFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "RegistryInfo" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "address" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "namehash" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "parentRegistry" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "createdBlock" } },
          { kind: "Field", name: { kind: "Name", value: "labelCount" } },
          { kind: "Field", name: { kind: "Name", value: "referencedByCount" } },
          { kind: "Field", name: { kind: "Name", value: "roleCount" } },
          { kind: "Field", name: { kind: "Name", value: "eventCount" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetRegistryByNameQuery, V2GetRegistryByNameQueryVariables>;
