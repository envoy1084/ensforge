import type { Ensforge } from "@ensforge/sdk";

import { defineForm } from "../../../form/define-form";
import { bigintListField, stringListField } from "../../../form/fields/factories";
import { defaultNameByNetwork } from "../../../runtime/network";
import { bigintField, ensNameField, hexField, nameForm, textField } from "../shared-fields";
import { defineReadAction, type AnyReadActionDefinition } from "../types";

const nameAction = (
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
  "records.getAbi": nameAction("records.getAbi", "getAbi", (sdk, name) =>
    sdk.records.getAbi({ name }),
  ),
  "records.getAddress": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          coinType: bigintField({ initialValue: 60n, label: "Coin type", minimum: 0n }),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.records.getAddress({ name: values.name, coinType: values.coinType }),
    id: "records.getAddress",
    label: "getAddress",
  }),
  "records.getAddresses": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          coinTypes: bigintListField({
            initialValue: [60n],
            label: "Coin types",
            minimumLength: 1,
            placeholder: "60",
          }),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.records.getAddresses({ name: values.name, coinTypes: values.coinTypes }),
    id: "records.getAddresses",
    label: "getAddresses",
  }),
  "records.getAvatar": nameAction("records.getAvatar", "getAvatar", (sdk, name) =>
    sdk.records.getAvatar({ name }),
  ),
  "records.getContentHash": nameAction("records.getContentHash", "getContentHash", (sdk, name) =>
    sdk.records.getContentHash({ name }),
  ),
  "records.getData": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          key: textField({ initialValue: "url", label: "Data key" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.records.getData({ name: values.name, key: values.key }),
    id: "records.getData",
    label: "getData",
  }),
  "records.getInterface": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          interfaceId: hexField({
            bytes: 4,
            initialValue: "0x01ffc9a7",
            label: "Interface ID",
          }),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.records.getInterface({ name: values.name, interfaceId: values.interfaceId }),
    id: "records.getInterface",
    label: "getInterface",
  }),
  "records.getName": nameAction("records.getName", "getName", (sdk, name) =>
    sdk.records.getName({ name }),
  ),
  "records.getPubkey": nameAction("records.getPubkey", "getPubkey", (sdk, name) =>
    sdk.records.getPubkey({ name }),
  ),
  "records.getText": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          key: textField({ initialValue: "url", label: "Text record key" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.records.getText({ name: values.name, key: values.key }),
    id: "records.getText",
    label: "getText",
  }),
  "records.getTexts": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          keys: stringListField({
            initialValue: ["url"],
            label: "Text record keys",
            minimumLength: 1,
            placeholder: "url",
          }),
        },
      }),
    execute: ({ sdk, values }) => sdk.records.getTexts({ name: values.name, keys: values.keys }),
    id: "records.getTexts",
    label: "getTexts",
  }),
} as const;
