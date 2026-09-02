/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
/** Order direction for sorting */
export type OrderDirection = "asc" | "desc";

/** Filter criteria for querying registrations */
export type RegistrationFilter = {
  /** Filter by expiry date greater than */
  readonly expiryDate_gt?: number | null | undefined;
  /** Filter by expiry date greater than or equal */
  readonly expiryDate_gte?: number | null | undefined;
  /** Filter by expiry date less than */
  readonly expiryDate_lt?: number | null | undefined;
  /** Filter by expiry date less than or equal */
  readonly expiryDate_lte?: number | null | undefined;
  /** Filter by protocol (v1 or v2) */
  readonly protocol?: string | null | undefined;
  /** Filter by registrant address */
  readonly registrant?: string | null | undefined;
  /** Filter by registrant address in list */
  readonly registrant_in?: ReadonlyArray<string> | null | undefined;
};

/** Fields to order Registration results by */
export type Registration_OrderBy = "expiryDate" | "id" | "name" | "registrationDate";

export type V2GetRegistrationsQueryVariables = Exact<{
  first: number;
  after?: string | null | undefined;
  where: RegistrationFilter;
  orderBy: Registration_OrderBy;
  orderDirection: OrderDirection;
}>;

export type V2GetRegistrationsQuery = {
  readonly _meta: { readonly block: { readonly number: number } };
  readonly registrationConnection: {
    readonly edges: ReadonlyArray<{
      readonly cursor: string;
      readonly node: {
        readonly id: string;
        readonly protocol: string;
        readonly name: string;
        readonly labelName: string | null;
        readonly registrationDate: number;
        readonly expiryDate: number;
        readonly cost: string | null;
        readonly baseCost: string | null;
        readonly premium: string | null;
        readonly referrer: string | null;
        readonly registrant: { readonly id: string };
        readonly domain: { readonly id: string; readonly owner: { readonly id: string } };
      };
    }>;
    readonly pageInfo: { readonly hasNextPage: boolean; readonly endCursor: string | null };
  };
};

export const V2GetRegistrationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "V2GetRegistrations" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "first" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "after" } },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "where" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "RegistrationFilter" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderBy" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Registration_orderBy" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "orderDirection" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "OrderDirection" } },
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
            name: { kind: "Name", value: "registrationConnection" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "first" },
                value: { kind: "Variable", name: { kind: "Name", value: "first" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "after" },
                value: { kind: "Variable", name: { kind: "Name", value: "after" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: { kind: "Variable", name: { kind: "Name", value: "where" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderBy" },
                value: { kind: "Variable", name: { kind: "Name", value: "orderBy" } },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "orderDirection" },
                value: { kind: "Variable", name: { kind: "Name", value: "orderDirection" } },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "edges" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "cursor" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "node" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            { kind: "Field", name: { kind: "Name", value: "id" } },
                            { kind: "Field", name: { kind: "Name", value: "protocol" } },
                            { kind: "Field", name: { kind: "Name", value: "name" } },
                            { kind: "Field", name: { kind: "Name", value: "labelName" } },
                            { kind: "Field", name: { kind: "Name", value: "registrationDate" } },
                            { kind: "Field", name: { kind: "Name", value: "expiryDate" } },
                            { kind: "Field", name: { kind: "Name", value: "cost" } },
                            { kind: "Field", name: { kind: "Name", value: "baseCost" } },
                            { kind: "Field", name: { kind: "Name", value: "premium" } },
                            { kind: "Field", name: { kind: "Name", value: "referrer" } },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "registrant" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                ],
                              },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "domain" },
                              selectionSet: {
                                kind: "SelectionSet",
                                selections: [
                                  { kind: "Field", name: { kind: "Name", value: "id" } },
                                  {
                                    kind: "Field",
                                    name: { kind: "Name", value: "owner" },
                                    selectionSet: {
                                      kind: "SelectionSet",
                                      selections: [
                                        { kind: "Field", name: { kind: "Name", value: "id" } },
                                      ],
                                    },
                                  },
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
                  kind: "Field",
                  name: { kind: "Name", value: "pageInfo" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "hasNextPage" } },
                      { kind: "Field", name: { kind: "Name", value: "endCursor" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<V2GetRegistrationsQuery, V2GetRegistrationsQueryVariables>;
