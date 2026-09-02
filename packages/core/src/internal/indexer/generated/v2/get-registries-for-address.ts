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

export type V2GetRegistriesForAddressQueryVariables = Exact<{
  owner: string;
}>;

export type V2GetRegistriesForAddressQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly registries: ReadonlyArray<{
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
  }>;
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
export const V2GetRegistriesForAddressDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetRegistriesForAddress" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "owner" } },
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
            name: { kind: "Name", value: "registries" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "owner" },
                value: { kind: "Variable", name: { kind: "Name", value: "owner" } },
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
} as unknown as DocumentNode<
  V2GetRegistriesForAddressQuery,
  V2GetRegistriesForAddressQueryVariables
>;
