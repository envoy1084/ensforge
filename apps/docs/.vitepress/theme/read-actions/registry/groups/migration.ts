import type { Ensforge } from "@ensforge/sdk";

import { nameForm } from "../shared-fields";
import { defineReadAction, type AnyReadActionDefinition } from "../types";

const action = (
  id: string,
  label: string,
  execute: (sdk: Ensforge, name: string) => Promise<unknown>,
): AnyReadActionDefinition =>
  defineReadAction({
    createForm: nameForm,
    execute: ({ sdk, values }) => execute(sdk, values.name),
    id,
    label,
  });

export const definitions = {
  "migration.getMigrationStatus": action(
    "migration.getMigrationStatus",
    "getMigrationStatus",
    (sdk, name) => sdk.migration.getMigrationStatus({ name }),
  ),
  "migration.getMigrationTarget": action(
    "migration.getMigrationTarget",
    "getMigrationTarget",
    (sdk, name) => sdk.migration.getMigrationTarget({ name }),
  ),
} as const;
