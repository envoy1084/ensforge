import { defineForm } from "../../../form/define-form";
import { toggleField } from "../../../form/fields/factories";
import { defaultNameByNetwork, zeroAddress } from "../../../runtime/network";
import {
  addressAndPageForm,
  addressField,
  addressForm,
  ensNameField,
  nameAndPageForm,
  nameForm,
  pageSizeField,
  protocolField,
  selectField,
  textField,
} from "../shared-fields";
import { defineReadAction } from "../types";

export const definitions = {
  "indexer.getIndexerStatus": defineReadAction({
    createForm: () => defineForm({ fields: {} }),
    execute: ({ sdk }) => sdk.indexer.getIndexerStatus(),
    id: "indexer.getIndexerStatus",
    label: "getIndexerStatus",
  }),
  "indexer.getDecodedName": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          allowIncomplete: toggleField({ initialValue: true, label: "Allow incomplete names" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.indexer.getDecodedName(values),
    id: "indexer.getDecodedName",
    label: "getDecodedName",
  }),
  "indexer.getIndexedName": defineReadAction({
    createForm: nameForm,
    execute: ({ sdk, values }) => sdk.indexer.getIndexedName(values),
    id: "indexer.getIndexedName",
    label: "getIndexedName",
  }),
  "indexer.getNames": defineReadAction({
    createForm: () =>
      defineForm({ fields: { protocol: protocolField(), pageSize: pageSizeField() } }),
    execute: ({ sdk, values }) =>
      sdk.indexer.getNames({
        pageSize: values.pageSize,
        ...(values.protocol === "all" ? {} : { filter: { protocol: values.protocol } }),
      }),
    id: "indexer.getNames",
    label: "getNames",
  }),
  "indexer.getNamesForAddress": defineReadAction({
    createForm: addressAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getNamesForAddress(values),
    id: "indexer.getNamesForAddress",
    label: "getNamesForAddress",
  }),
  "indexer.getResolvedNamesForAddress": defineReadAction({
    createForm: addressAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getResolvedNamesForAddress(values),
    id: "indexer.getResolvedNamesForAddress",
    label: "getResolvedNamesForAddress",
  }),
  "indexer.getSubnames": defineReadAction({
    createForm: nameAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getSubnames(values),
    id: "indexer.getSubnames",
    label: "getSubnames",
  }),
  "indexer.searchNames": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          query: textField({ initialValue: "ens", label: "Search" }),
          field: selectField({
            initialValue: "label",
            label: "Field",
            options: [
              { label: "Label", value: "label" },
              { label: "Full name", value: "name" },
            ],
          }),
          mode: selectField({
            initialValue: "contains",
            label: "Match",
            options: [
              { label: "Contains", value: "contains" },
              { label: "Starts with", value: "starts-with" },
              { label: "Ends with", value: "ends-with" },
            ],
          }),
          pageSize: pageSizeField(),
        },
      }),
    execute: ({ sdk, values }) => sdk.indexer.searchNames(values),
    id: "indexer.searchNames",
    label: "searchNames",
  }),
  "indexer.getIndexedRecords": defineReadAction({
    createForm: nameForm,
    execute: ({ sdk, values }) => sdk.indexer.getIndexedRecords(values),
    id: "indexer.getIndexedRecords",
    label: "getIndexedRecords",
  }),
  "indexer.getRecordHistory": defineReadAction({
    createForm: nameAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getRecordHistory(values),
    id: "indexer.getRecordHistory",
    label: "getRecordHistory",
  }),
  "indexer.getRegistrations": defineReadAction({
    createForm: () =>
      defineForm({ fields: { protocol: protocolField(), pageSize: pageSizeField() } }),
    execute: ({ sdk, values }) =>
      sdk.indexer.getRegistrations({
        filter: {
          protocols: values.protocol === "all" ? ["v1", "v2"] : [values.protocol],
        },
        pageSize: values.pageSize,
      }),
    id: "indexer.getRegistrations",
    label: "getRegistrations",
  }),
  "indexer.getRegistrationsForAddress": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          address: addressField({ initialValue: zeroAddress, label: "Address" }),
          protocol: protocolField(),
          pageSize: pageSizeField(),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.indexer.getRegistrationsForAddress({
        address: values.address,
        filter: {
          protocols: values.protocol === "all" ? ["v1", "v2"] : [values.protocol],
        },
        pageSize: values.pageSize,
      }),
    id: "indexer.getRegistrationsForAddress",
    label: "getRegistrationsForAddress",
  }),
  "indexer.getEvents": defineReadAction({
    createForm: () => defineForm({ fields: { pageSize: pageSizeField() } }),
    execute: ({ sdk, values }) => sdk.indexer.getEvents(values),
    id: "indexer.getEvents",
    label: "getEvents",
  }),
  "indexer.getNameHistory": defineReadAction({
    createForm: nameAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getNameHistory(values),
    id: "indexer.getNameHistory",
    label: "getNameHistory",
  }),
  "indexer.getRegistrationHistory": defineReadAction({
    createForm: nameAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getRegistrationHistory(values),
    id: "indexer.getRegistrationHistory",
    label: "getRegistrationHistory",
  }),
  "indexer.getRegistriesForAddress": defineReadAction({
    createForm: addressAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getRegistriesForAddress(values),
    id: "indexer.getRegistriesForAddress",
    label: "getRegistriesForAddress",
  }),
  "indexer.getRegistry": defineReadAction({
    createForm: nameForm,
    execute: ({ sdk, values }) => sdk.indexer.getRegistry(values),
    id: "indexer.getRegistry",
    label: "getRegistry",
  }),
  "indexer.getRegistryLabels": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          address: addressField({ initialValue: zeroAddress, label: "Registry address" }),
          relationship: selectField({
            initialValue: "label",
            label: "Relationship",
            options: [
              { label: "Label", value: "label" },
              { label: "Referenced by", value: "referenced-by" },
            ],
          }),
          pageSize: pageSizeField(),
        },
      }),
    execute: ({ sdk, values }) => sdk.indexer.getRegistryLabels(values),
    id: "indexer.getRegistryLabels",
    label: "getRegistryLabels",
  }),
  "indexer.getRegistryRoles": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          registry: addressField({ initialValue: zeroAddress, label: "Registry address" }),
          active: toggleField({ initialValue: true, label: "Only active roles" }),
          pageSize: pageSizeField(),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.indexer.getRegistryRoles({
        registry: values.registry,
        filter: { active: values.active },
        pageSize: values.pageSize,
      }),
    id: "indexer.getRegistryRoles",
    label: "getRegistryRoles",
  }),
  "indexer.getIndexedResolver": defineReadAction({
    createForm: addressForm,
    execute: ({ sdk, values }) => sdk.indexer.getIndexedResolver(values),
    id: "indexer.getIndexedResolver",
    label: "getIndexedResolver",
  }),
  "indexer.getResolverApprovals": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          resolver: addressField({ initialValue: zeroAddress, label: "Resolver address" }),
          approved: toggleField({ initialValue: true, label: "Approved" }),
          pageSize: pageSizeField(),
        },
      }),
    execute: ({ sdk, values }) =>
      sdk.indexer.getResolverApprovals({
        filter: { resolver: values.resolver, approved: values.approved },
        pageSize: values.pageSize,
      }),
    id: "indexer.getResolverApprovals",
    label: "getResolverApprovals",
  }),
  "indexer.getResolverMetadata": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          resolver: addressField({ initialValue: zeroAddress, label: "Resolver address" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.indexer.getResolverMetadata(values),
    id: "indexer.getResolverMetadata",
    label: "getResolverMetadata",
  }),
  "indexer.getResolversForAddress": defineReadAction({
    createForm: addressAndPageForm,
    execute: ({ sdk, values }) => sdk.indexer.getResolversForAddress(values),
    id: "indexer.getResolversForAddress",
    label: "getResolversForAddress",
  }),
} as const;
