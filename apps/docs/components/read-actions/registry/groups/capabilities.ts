import type { Ensforge } from "@ensforge/sdk";

import { defineForm } from "../../../form/define-form";
import { defaultAccountByNetwork, defaultNameByNetwork } from "../../../runtime/network";
import { addressField, bigintField, ensNameField, nameForm, selectField } from "../shared-fields";
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

const approvalForm = (network: "mainnet" | "sepolia", thirdLabel: string) =>
  defineForm({
    fields: {
      name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
      owner: addressField({ initialValue: defaultAccountByNetwork[network], label: "Owner" }),
      target: addressField({ initialValue: defaultAccountByNetwork[network], label: thirdLabel }),
    },
  });

const accountForm = (network: "mainnet" | "sepolia") =>
  defineForm({
    fields: {
      name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
      account: addressField({ initialValue: defaultAccountByNetwork[network], label: "Account" }),
    },
  });

const rolesForm = (network: "mainnet" | "sepolia") =>
  defineForm({
    fields: {
      ...accountForm(network).fields,
      roles: bigintField({ initialValue: 1n, label: "Role bitmask", minimum: 0n }),
    },
  });

const operationField = () =>
  selectField({
    initialValue: "text",
    label: "Operation",
    options: [
      { label: "Set text record", value: "text" },
      { label: "Set ETH address", value: "address" },
      { label: "Set content hash", value: "contentHash" },
      { label: "Set resolver", value: "setResolver" },
      { label: "Transfer name", value: "transfer" },
    ],
  });

const operationFrom = (operation: string) => {
  if (operation === "address") return { type: "address", coinType: 60n } as const;
  if (operation === "contentHash") return { type: "contentHash" } as const;
  if (operation === "setResolver") return { type: "setResolver" } as const;
  if (operation === "transfer") return { type: "transfer" } as const;
  return { type: "text", key: "description" } as const;
};

const recordOperationFrom = (operation: string) => {
  if (operation === "address") return { type: "address", coinType: 60n } as const;
  if (operation === "contentHash") return { type: "contentHash" } as const;
  return { type: "text", key: "description" } as const;
};

export const definitions = {
  "capabilities.getNameCapabilities": defineReadAction({
    createForm: accountForm,
    execute: ({ sdk, values }) => sdk.capabilities.getNameCapabilities(values),
    id: "capabilities.getNameCapabilities",
    label: "getNameCapabilities",
  }),
  "capabilities.getOperatorApproval": defineReadAction({
    createForm: (network) => approvalForm(network, "Operator"),
    execute: ({ sdk, values }) =>
      sdk.capabilities.getOperatorApproval({
        name: values.name,
        owner: values.owner,
        operator: values.target,
      }),
    id: "capabilities.getOperatorApproval",
    label: "getOperatorApproval",
  }),
  "capabilities.getRecordPermissions": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          ...accountForm(network).fields,
          record: selectField({
            initialValue: "text",
            label: "Record",
            options: [
              { label: "Text: description", value: "text" },
              { label: "ETH address", value: "address" },
              { label: "Content hash", value: "contentHash" },
            ],
          }),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.capabilities.getRecordPermissions({
        name: values.name,
        account: values.account,
        records: [recordOperationFrom(values.record)],
      }),
    id: "capabilities.getRecordPermissions",
    label: "getRecordPermissions",
  }),
  "capabilities.getRegistryCapabilities": nameAction(
    "capabilities.getRegistryCapabilities",
    "getRegistryCapabilities",
    (sdk, name) => sdk.capabilities.getRegistryCapabilities({ name }),
  ),
  "capabilities.getRegistryRoles": defineReadAction({
    createForm: accountForm,
    execute: ({ sdk, values }) => sdk.capabilities.getRegistryRoles(values),
    id: "capabilities.getRegistryRoles",
    label: "getRegistryRoles",
  }),
  "capabilities.getRequiredAuthorization": defineReadAction({
    createForm: (network) =>
      defineForm({ fields: { ...accountForm(network).fields, operation: operationField() } }),
    execute: ({ sdk, values }) =>
      sdk.capabilities.getRequiredAuthorization({
        name: values.name,
        account: values.account,
        operation: operationFrom(values.operation),
      }),
    id: "capabilities.getRequiredAuthorization",
    label: "getRequiredAuthorization",
  }),
  "capabilities.getResolverCapabilities": nameAction(
    "capabilities.getResolverCapabilities",
    "getResolverCapabilities",
    (sdk, name) => sdk.capabilities.getResolverCapabilities({ name }),
  ),
  "capabilities.getResolverDelegateApproval": defineReadAction({
    createForm: (network) => approvalForm(network, "Delegate"),
    execute: ({ sdk, values }) =>
      sdk.capabilities.getResolverDelegateApproval({
        name: values.name,
        owner: values.owner,
        delegate: values.target,
      }),
    id: "capabilities.getResolverDelegateApproval",
    label: "getResolverDelegateApproval",
  }),
  "capabilities.getResolverRoles": defineReadAction({
    createForm: accountForm,
    execute: ({ sdk, values }) => sdk.capabilities.getResolverRoles(values),
    id: "capabilities.getResolverRoles",
    label: "getResolverRoles",
  }),
  "capabilities.getTokenApproval": nameAction(
    "capabilities.getTokenApproval",
    "getTokenApproval",
    (sdk, name) => sdk.capabilities.getTokenApproval({ name }),
  ),
  "capabilities.getWrapperPermissions": defineReadAction({
    createForm: accountForm,
    execute: ({ sdk, values }) => sdk.capabilities.getWrapperPermissions(values),
    id: "capabilities.getWrapperPermissions",
    label: "getWrapperPermissions",
  }),
  "capabilities.getWriteTarget": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          operation: operationField(),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.capabilities.getWriteTarget({
        name: values.name,
        operation: operationFrom(values.operation),
      }),
    id: "capabilities.getWriteTarget",
    label: "getWriteTarget",
  }),
  "capabilities.hasRegistryRoles": defineReadAction({
    createForm: rolesForm,
    execute: ({ sdk, values }) => sdk.capabilities.hasRegistryRoles(values),
    id: "capabilities.hasRegistryRoles",
    label: "hasRegistryRoles",
  }),
  "capabilities.hasResolverRoles": defineReadAction({
    createForm: rolesForm,
    execute: ({ sdk, values }) => sdk.capabilities.hasResolverRoles(values),
    id: "capabilities.hasResolverRoles",
    label: "hasResolverRoles",
  }),
} as const;
