import { defineForm } from "../../../form/define-form";
import { defaultNameByNetwork } from "../../../runtime/network";
import { ensNameField, integerField } from "../shared-fields";
import { defineReadAction } from "../types";

const eventForm = (network: "mainnet" | "sepolia") =>
  defineForm({
    fields: {
      name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
      lookback: integerField({
        initialValue: 5_000,
        label: "Blocks to scan",
        maximum: 50_000,
        minimum: 1,
      }),
    },
  });

export const definitions = {
  "events.getEnsEvents": defineReadAction({
    createForm: eventForm,
    execute: async ({ sdk, values }) => {
      const latest = await sdk.config.publicClient.getBlockNumber();
      const lookback = BigInt(values.lookback);
      return sdk.events.getEnsEvents({
        name: values.name,
        fromBlock: latest > lookback ? latest - lookback : 0n,
        toBlock: latest,
      });
    },
    id: "events.getEnsEvents",
    label: "getEnsEvents",
  }),
  "events.getNameHistory": defineReadAction({
    createForm: eventForm,
    execute: async ({ sdk, values }) => {
      const latest = await sdk.config.publicClient.getBlockNumber();
      const lookback = BigInt(values.lookback);
      return sdk.events.getNameHistory({
        name: values.name,
        fromBlock: latest > lookback ? latest - lookback : 0n,
        toBlock: latest,
      });
    },
    id: "events.getNameHistory",
    label: "getNameHistory",
  }),
} as const;
