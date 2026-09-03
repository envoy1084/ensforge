import { defineForm } from "../../form/define-form";
import {
  addressField,
  bigintField,
  ensNameField,
  hexField,
  integerField,
  selectField,
  textField,
} from "../../form/fields/factories";
import { defaultNameByNetwork, zeroAddress, type Network } from "../../runtime/network";

export const nameForm = (network: Network) =>
  defineForm({
    fields: {
      name: ensNameField({
        initialValue: defaultNameByNetwork[network],
        label: "Name",
        placeholder: "ens.eth",
      }),
    },
  });

export const nameAndPageForm = (network: Network) =>
  defineForm({
    fields: {
      name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
      pageSize: integerField({ initialValue: 20, label: "Page size", maximum: 100, minimum: 1 }),
    },
  });

export const addressForm = () =>
  defineForm({
    fields: {
      address: addressField({ initialValue: zeroAddress, label: "Address" }),
    },
  });

export const addressAndPageForm = () =>
  defineForm({
    fields: {
      address: addressField({ initialValue: zeroAddress, label: "Address" }),
      pageSize: integerField({ initialValue: 20, label: "Page size", maximum: 100, minimum: 1 }),
    },
  });

export const pageSizeField = () =>
  integerField({ initialValue: 20, label: "Page size", maximum: 100, minimum: 1 });

export const durationField = () =>
  bigintField({
    initialValue: 31_536_000n,
    label: "Duration in seconds",
    minimum: 1n,
    placeholder: "31536000",
  });

export const accountField = (label = "Account") =>
  addressField({ initialValue: zeroAddress, label });

export const bytes32Field = (label: string) =>
  hexField({
    bytes: 32,
    initialValue: `0x${"0".repeat(63)}1`,
    label,
  });

export const protocolField = () =>
  selectField({
    initialValue: "all",
    label: "Protocol",
    options: [
      { label: "ENSv1 and ENSv2", value: "all" },
      { label: "ENSv1", value: "v1" },
      { label: "ENSv2", value: "v2" },
    ],
  });

export { addressField, bigintField, ensNameField, hexField, integerField, selectField, textField };
