import { nameForm } from "../shared-fields";
import { defineReadAction } from "../types";

export const definitions = {
  "ownership.getTtl": defineReadAction({
    createForm: nameForm,
    execute: ({ sdk, values }) => sdk.ownership.getTtl({ name: values.name }),
    id: "ownership.getTtl",
    label: "getTtl",
  }),
} as const;
