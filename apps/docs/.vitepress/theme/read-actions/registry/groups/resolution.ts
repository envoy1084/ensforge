import type { Ensforge } from "@ensforge/sdk";

import { defineForm } from "../../../components/form/define-form";
import { defaultNameByNetwork, zeroAddress } from "../../../runtime/network";
import { addressField, ensNameField, hexField, nameForm } from "../shared-fields";
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
  "resolution.getAlias": nameAction("resolution.getAlias", "getAlias", (sdk, name) =>
    sdk.resolution.getAlias({ name }),
  ),
  "resolution.getResolver": nameAction("resolution.getResolver", "getResolver", (sdk, name) =>
    sdk.resolution.getResolver({ name }),
  ),
  "resolution.getResolverVersion": nameAction(
    "resolution.getResolverVersion",
    "getResolverVersion",
    (sdk, name) => sdk.resolution.getResolverVersion({ name }),
  ),
  "resolution.resolve": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          data: hexField({ initialValue: "0x", label: "Resolver calldata" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.resolution.resolve(values),
    id: "resolution.resolve",
    label: "resolve",
  }),
  "resolution.resolveWithResolver": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          data: hexField({ initialValue: "0x", label: "Resolver calldata" }),
          resolverAddress: addressField({ initialValue: zeroAddress, label: "Resolver address" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.resolution.resolveWithResolver(values),
    id: "resolution.resolveWithResolver",
    label: "resolveWithResolver",
  }),
} as const;
