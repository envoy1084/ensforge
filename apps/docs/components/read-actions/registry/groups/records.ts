import type { Ensforge } from "@ensforge/sdk";

import { defineForm } from "../../../form/define-form";
import { bigintListField, stringListField, toggleField } from "../../../form/fields/factories";
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
            initialValue: [60n, 0n, 501n, 2_147_492_101n],
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
  "records.getAvatar": defineReadAction({
    createForm: nameForm,
    execute: ({ sdk, values }) => sdk.records.getAvatar({ name: values.name }),
    id: "records.getAvatar",
    label: "getAvatar",
    presentation: {
      kind: "image",
      source: (result) => {
        if (typeof result !== "object" || result === null || !("status" in result)) {
          return undefined;
        }
        if (result.status !== "resolved" || !("uri" in result) || typeof result.uri !== "string") {
          return undefined;
        }
        return result.uri;
      },
    },
  }),
  "records.getContentHash": nameAction("records.getContentHash", "getContentHash", (sdk, name) =>
    sdk.records.getContentHash({ name }),
  ),
  "records.getData": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          key: textField({ initialValue: "com.ensforge.docs", label: "Data key" }),
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
            initialValue: ["url", "description", "com.twitter", "email", "avatar"],
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
  "records.getRecords": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          addresses: bigintListField({
            initialValue: [60n, 0n, 501n, 2_147_492_101n],
            label: "Coin types",
            minimumLength: 1,
            placeholder: "60",
          }),
          texts: stringListField({
            initialValue: ["url", "description", "com.twitter", "email", "avatar"],
            label: "Text record keys",
            minimumLength: 1,
            placeholder: "url",
          }),
          avatar: toggleField({ initialValue: true, label: "Avatar" }),
          contentHash: toggleField({ initialValue: true, label: "Content hash" }),
          abi: toggleField({ initialValue: true, label: "ABI" }),
          pubkey: toggleField({ initialValue: true, label: "Public key" }),
          nameRecord: toggleField({ initialValue: true, label: "Name record" }),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.records.getRecords({
        name: values.name,
        records: {
          addresses: values.addresses,
          texts: values.texts,
          avatar: values.avatar,
          contentHash: values.contentHash,
          abi: values.abi,
          pubkey: values.pubkey,
          name: values.nameRecord,
        },
      }),
    id: "records.getRecords",
    label: "getRecords",
  }),
} as const;
