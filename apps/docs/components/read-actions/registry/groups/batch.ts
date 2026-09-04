import { defineForm } from "../../../form/define-form";
import { stringListField } from "../../../form/fields/factories";
import { defaultNameByNetwork } from "../../../runtime/network";
import { defineReadAction } from "../types";

const namesForm = (network: "mainnet" | "sepolia") =>
  defineForm({
    fields: {
      names: stringListField({
        initialValue: [defaultNameByNetwork[network]],
        label: "Names",
        minimumLength: 1,
        placeholder: "name.eth",
      }),
    },
  });

export const definitions = {
  "batch.readBatch": defineReadAction({
    createForm: namesForm,
    execute: ({ sdk, values }) =>
      sdk.batch.readBatch(
        Object.fromEntries(
          values.names.map((name, index) => [
            `owner${index + 1}`,
            sdk.name.getOwner.request({ name }),
          ]),
        ),
      ),
    id: "batch.readBatch",
    label: "readBatch",
  }),
  "batch.readBatchSettled": defineReadAction({
    createForm: namesForm,
    execute: ({ sdk, values }) =>
      sdk.batch.readBatchSettled(
        Object.fromEntries(
          values.names.map((name, index) => [
            `owner${index + 1}`,
            sdk.name.getOwner.request({ name }),
          ]),
        ),
      ),
    id: "batch.readBatchSettled",
    label: "readBatchSettled",
  }),
} as const;
