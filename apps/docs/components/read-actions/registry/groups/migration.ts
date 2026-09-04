import type { Ensforge } from "@ensforge/sdk";

import { defineForm } from "../../../form/define-form";
import { defaultAccountByNetwork, defaultNameByNetwork } from "../../../runtime/network";
import { addressField, ensNameField, nameForm } from "../shared-fields";
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
  "migration.getMigrationEligibility": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          account: addressField({
            initialValue: defaultAccountByNetwork[network],
            label: "Account",
          }),
        },
      }),
    execute: ({ sdk, values }) => sdk.migration.getMigrationEligibility(values),
    id: "migration.getMigrationEligibility",
    label: "getMigrationEligibility",
  }),
  "migration.getMigrationPlan": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          account: addressField({
            initialValue: defaultAccountByNetwork[network],
            label: "Account",
          }),
        },
      }),
    execute: ({ sdk, values }) => sdk.migration.getMigrationPlan(values),
    id: "migration.getMigrationPlan",
    label: "getMigrationPlan",
  }),
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
