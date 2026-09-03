import type { Ensforge } from "@ensforge/sdk";

import type { DecodedFields, FieldMap, FormDefinition } from "../../components/form/types";
import type { Network } from "../../runtime/network";

export interface ReadActionDefinition<Fields extends FieldMap = FieldMap> {
  readonly createForm: (network: Network) => FormDefinition<Fields>;
  readonly execute: (context: {
    readonly sdk: Ensforge;
    readonly values: DecodedFields<Fields>;
  }) => Promise<unknown>;
  readonly id: string;
  readonly label: string;
}

export type AnyReadActionDefinition = ReadActionDefinition<FieldMap>;

export const defineReadAction = <const Fields extends FieldMap>(
  definition: ReadActionDefinition<Fields>,
): AnyReadActionDefinition => definition as unknown as AnyReadActionDefinition;
