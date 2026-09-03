import type { Ensforge } from "@ensforge/sdk";

import { defineForm } from "../../../form/define-form";
import { defaultNameByNetwork } from "../../../runtime/network";
import { ensNameField, integerField, nameForm, textField } from "../shared-fields";
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
  "dns.getDnsClaimStatus": nameAction("dns.getDnsClaimStatus", "getDnsClaimStatus", (sdk, name) =>
    sdk.dns.getDnsClaimStatus({ name }),
  ),
  "dns.getDnsImportPlan": nameAction("dns.getDnsImportPlan", "getDnsImportPlan", (sdk, name) =>
    sdk.dns.getDnsImportPlan({ name }),
  ),
  "dns.getDnsRecord": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          recordName: textField({ initialValue: "_ens.example.com", label: "DNS record name" }),
          resource: integerField({
            initialValue: 1,
            label: "Resource type",
            maximum: 65_535,
            minimum: 0,
          }),
        },
      }),
    execute: ({ sdk, values }) => sdk.dns.getDnsRecord(values),
    id: "dns.getDnsRecord",
    label: "getDnsRecord",
  }),
  "dns.getZoneHash": nameAction("dns.getZoneHash", "getZoneHash", (sdk, name) =>
    sdk.dns.getZoneHash({ name }),
  ),
  "dns.hasDnsRecords": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          recordName: textField({ initialValue: "_ens.example.com", label: "DNS record name" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.dns.hasDnsRecords(values),
    id: "dns.hasDnsRecords",
    label: "hasDnsRecords",
  }),
} as const;
