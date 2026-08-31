import type { Ensforge } from "@ensforge/sdk";

export interface ReadActionField {
  readonly key: string;
  readonly kind: "address" | "name" | "text";
  readonly label: string;
  readonly placeholder: string;
  readonly required?: boolean;
}

export interface ReadActionDefinition {
  readonly description: string;
  readonly fields: ReadonlyArray<ReadActionField>;
  readonly initialValues: Readonly<Record<string, string>>;
  readonly label: string;
  readonly run: (sdk: Ensforge, values: Readonly<Record<string, string>>) => Promise<unknown>;
}

export const readActionDefinitions = {
  getOwner: {
    description: "Resolve the effective owner, registrant, and ownership level for an ENS name.",
    fields: [
      {
        key: "name",
        kind: "name",
        label: "Name",
        placeholder: "ens.eth",
        required: true,
      },
    ],
    initialValues: { name: "ens.eth" },
    label: "getOwner",
    run: (sdk, values) => sdk.name.getOwner({ name: values.name ?? "" }),
  },
} satisfies Record<string, ReadActionDefinition>;

export type ReadActionId = keyof typeof readActionDefinitions;
