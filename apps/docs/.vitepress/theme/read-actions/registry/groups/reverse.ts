import { addressForm } from "../shared-fields";
import { defineReadAction } from "../types";

export const definitions = {
  "reverse.getPrimaryName": defineReadAction({
    createForm: addressForm,
    execute: ({ sdk, values }) => sdk.reverse.getPrimaryName({ address: values.address }),
    id: "reverse.getPrimaryName",
    label: "getPrimaryName",
  }),
} as const;
