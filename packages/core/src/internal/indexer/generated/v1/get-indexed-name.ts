/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type V1IndexedNameFieldsFragment = {
  readonly id: string;
  readonly name: string | null;
  readonly labelName: string | null;
  readonly labelhash: `0x${string}` | null;
  readonly createdAt: string;
  readonly expiryDate: string | null;
  readonly subdomainCount: number;
  readonly isMigrated: boolean;
  readonly ttl: string | null;
  readonly parent: { readonly id: string } | null;
  readonly owner: { readonly id: string };
  readonly registrant: { readonly id: string } | null;
  readonly resolvedAddress: { readonly id: string } | null;
  readonly resolver: { readonly address: `0x${string}` } | null;
  readonly registration: {
    readonly registrationDate: string;
    readonly expiryDate: string;
    readonly registrant: { readonly id: string };
  } | null;
  readonly wrappedOwner: { readonly id: string } | null;
  readonly wrappedDomain: {
    readonly fuses: number;
    readonly expiryDate: string;
    readonly owner: { readonly id: string };
  } | null;
};

export type V1GetIndexedNameQueryVariables = Exact<{
  id: string | number;
}>;

export type V1GetIndexedNameQuery = {
  readonly _meta: { readonly block: { readonly number: number } } | null;
  readonly domain: {
    readonly id: string;
    readonly name: string | null;
    readonly labelName: string | null;
    readonly labelhash: `0x${string}` | null;
    readonly createdAt: string;
    readonly expiryDate: string | null;
    readonly subdomainCount: number;
    readonly isMigrated: boolean;
    readonly ttl: string | null;
    readonly parent: { readonly id: string } | null;
    readonly owner: { readonly id: string };
    readonly registrant: { readonly id: string } | null;
    readonly resolvedAddress: { readonly id: string } | null;
    readonly resolver: { readonly address: `0x${string}` } | null;
    readonly registration: {
      readonly registrationDate: string;
      readonly expiryDate: string;
      readonly registrant: { readonly id: string };
    } | null;
    readonly wrappedOwner: { readonly id: string } | null;
    readonly wrappedDomain: {
      readonly fuses: number;
      readonly expiryDate: string;
      readonly owner: { readonly id: string };
    } | null;
  } | null;
};

export const V1IndexedNameFieldsFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V1IndexedNameFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Domain" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "labelName" } },
          { kind: "Field", name: { kind: "Name", value: "labelhash" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "parent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "registrant" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolvedAddress" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolver" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "subdomainCount" } },
          { kind: "Field", name: { kind: "Name", value: "isMigrated" } },
          { kind: "Field", name: { kind: "Name", value: "ttl" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "registration" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registrant" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "registrationDate" } },
                { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedOwner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "fuses" } },
                { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V1IndexedNameFieldsFragment, unknown>;
export const V1GetIndexedNameDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V1GetIndexedName" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
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
                value: { kind: "Variable", name: { kind: "Name", value: "id" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "FragmentSpread", name: { kind: "Name", value: "V1IndexedNameFields" } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "V1IndexedNameFields" },
      typeCondition: { kind: "NamedType", name: { kind: "Name", value: "Domain" } },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "name" } },
          { kind: "Field", name: { kind: "Name", value: "labelName" } },
          { kind: "Field", name: { kind: "Name", value: "labelhash" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "parent" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "owner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "registrant" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolvedAddress" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "resolver" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "address" } }],
            },
          },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
          { kind: "Field", name: { kind: "Name", value: "subdomainCount" } },
          { kind: "Field", name: { kind: "Name", value: "isMigrated" } },
          { kind: "Field", name: { kind: "Name", value: "ttl" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "registration" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "registrant" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "registrationDate" } },
                { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedOwner" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "wrappedDomain" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "owner" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [{ kind: "Field", name: { kind: "Name", value: "id" } }],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "fuses" } },
                { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V1GetIndexedNameQuery, V1GetIndexedNameQueryVariables>;
