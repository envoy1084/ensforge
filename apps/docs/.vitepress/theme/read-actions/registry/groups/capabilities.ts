import type { Ensforge } from "@ensforge/sdk";

import { defineForm } from "../../../components/form/define-form";
import { defaultNameByNetwork, zeroAddress } from "../../../runtime/network";
import { addressField, bigintField, ensNameField, nameForm } from "../shared-fields";
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
      owner: addressField({ initialValue: zeroAddress, label: "Owner" }),
      target: addressField({ initialValue: zeroAddress, label: thirdLabel }),
    },
  });

const accountForm = (network: "mainnet" | "sepolia") =>
  defineForm({
    fields: {
      name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
      account: addressField({ initialValue: zeroAddress, label: "Account" }),
    },
  });

const rolesForm = (network: "mainnet" | "sepolia") =>
  defineForm({
    fields: {
      ...accountForm(network).fields,
      roles: bigintField({ initialValue: 1n, label: "Role bitmask", minimum: 0n }),
    },
  });

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
