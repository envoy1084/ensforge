import type { Ensforge } from "@ensforge/sdk";
import { encodeFunctionData } from "viem";
import { namehash } from "viem/ens";

import { defineForm } from "../../../form/define-form";
import { stringListField } from "../../../form/fields/factories";
import { defaultNameByNetwork, defaultResolverByNetwork } from "../../../runtime/network";
import { addressField, bigintField, ensNameField, hexField, nameForm } from "../shared-fields";
import { defineReadAction, type AnyReadActionDefinition } from "../types";

const addrAbi = [
  {
    type: "function",
    name: "addr",
    stateMutability: "view",
    inputs: [{ name: "node", type: "bytes32" }],
    outputs: [{ name: "", type: "address" }],
  },
] as const;

const encodeAddressCall = (name: string) =>
  encodeFunctionData({ abi: addrAbi, functionName: "addr", args: [namehash(name)] });

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
          data: hexField({
            initialValue: encodeAddressCall(defaultNameByNetwork[network]),
            label: "Resolver calldata",
          }),
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
          data: hexField({
            initialValue: encodeAddressCall(defaultNameByNetwork[network]),
            label: "Resolver calldata",
          }),
          resolverAddress: addressField({
            initialValue: defaultResolverByNetwork[network],
            label: "Resolver address",
          }),
        },
      }),
    execute: ({ sdk, values }) => sdk.resolution.resolveWithResolver(values),
    id: "resolution.resolveWithResolver",
    label: "resolveWithResolver",
  }),
  "resolution.resolveBatch": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          names: stringListField({
            initialValue: [defaultNameByNetwork[network]],
            label: "Names",
            minimumLength: 1,
            placeholder: "name.eth",
          }),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.resolution.resolveBatch({
        calls: values.names.map((name) => ({
          name,
          data: encodeAddressCall(name),
        })),
      }),
    id: "resolution.resolveBatch",
    label: "resolveBatch",
  }),
  "resolution.predictResolverAddress": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          salt: bigintField({ initialValue: 1n, label: "Salt", minimum: 0n }),
        },
      }),
    execute: ({ sdk, values }) => sdk.resolution.predictResolverAddress({ salt: values.salt }),
    id: "resolution.predictResolverAddress",
    label: "predictResolverAddress",
  }),
} as const;
