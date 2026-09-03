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
  "wrapping.getFuses": action("wrapping.getFuses", "getFuses", (sdk, name) =>
    sdk.wrapping.getFuses({ name }),
  ),
  "wrapping.getWrapperExpiry": action(
    "wrapping.getWrapperExpiry",
    "getWrapperExpiry",
    (sdk, name) => sdk.wrapping.getWrapperExpiry({ name }),
  ),
} as const;
