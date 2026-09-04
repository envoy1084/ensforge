import {
  analyzeName,
  decodeAddressRecord,
  decodeContentHash,
  dnsDecodeName,
  dnsEncodeName,
  encodeAddressRecord,
  encodeContentHash,
  fromCoinType,
  labelhash,
  namehash,
  normalizeLabel,
  normalizeName,
  toCoinType,
} from "@ensforge/core";

import { defineForm } from "../../../form/define-form";
import { defaultNameByNetwork } from "../../../runtime/network";
import { bigintField, hexField, selectField, textField } from "../shared-fields";
import { defineReadAction } from "../types";

const nameUtility = (id: string, label: string, execute: (name: string) => unknown) =>
  defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: textField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
        },
      }),
    execute: ({ values }) => Promise.resolve(execute(values.name)),
    id,
    label,
  });

const labelUtility = (id: string, label: string, execute: (labelValue: string) => unknown) =>
  defineReadAction({
    createForm: () =>
      defineForm({ fields: { label: textField({ initialValue: "ensforge", label: "Label" }) } }),
    execute: ({ values }) => Promise.resolve(execute(values.label)),
    id,
    label,
  });

export const definitions = {
  "utilities.normalizeName": nameUtility("utilities.normalizeName", "normalizeName", normalizeName),
  "utilities.normalizeLabel": labelUtility(
    "utilities.normalizeLabel",
    "normalizeLabel",
    normalizeLabel,
  ),
  "utilities.analyzeName": nameUtility("utilities.analyzeName", "analyzeName", (name) =>
    analyzeName(normalizeName(name)),
  ),
  "utilities.namehash": nameUtility("utilities.namehash", "namehash", namehash),
  "utilities.labelhash": labelUtility("utilities.labelhash", "labelhash", labelhash),
  "utilities.dnsEncodeName": nameUtility("utilities.dnsEncodeName", "dnsEncodeName", dnsEncodeName),
  "utilities.dnsDecodeName": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          encodedName: hexField({
            initialValue: dnsEncodeName(defaultNameByNetwork[network]),
            label: "DNS-encoded name",
          }),
        },
      }),
    execute: ({ values }) => Promise.resolve(dnsDecodeName(values.encodedName)),
    id: "utilities.dnsDecodeName",
    label: "dnsDecodeName",
  }),
  "utilities.toCoinType": defineReadAction({
    createForm: () =>
      defineForm({
        fields: { chainId: bigintField({ initialValue: 8453n, label: "Chain ID", minimum: 0n }) },
      }),
    execute: ({ values }) => Promise.resolve(toCoinType(Number(values.chainId))),
    id: "utilities.toCoinType",
    label: "toCoinType",
  }),
  "utilities.fromCoinType": defineReadAction({
    createForm: () =>
      defineForm({
        fields: { coinType: bigintField({ initialValue: 2_147_492_101n, label: "Coin type" }) },
      }),
    execute: ({ values }) => Promise.resolve(fromCoinType(values.coinType)),
    id: "utilities.fromCoinType",
    label: "fromCoinType",
  }),
  "utilities.encodeAddressRecord": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          coinType: bigintField({ initialValue: 0n, label: "Coin type", minimum: 0n }),
          address: textField({
            initialValue: "bc1qjqg9slurvjukfl92wp58y94480fvh4uc2pwa6n",
            label: "Address",
          }),
        },
      }),
    execute: ({ values }) => Promise.resolve(encodeAddressRecord(values)),
    id: "utilities.encodeAddressRecord",
    label: "encodeAddressRecord",
  }),
  "utilities.decodeAddressRecord": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          coinType: bigintField({ initialValue: 0n, label: "Coin type", minimum: 0n }),
          data: hexField({
            initialValue: "0x00149010587f8364b964fcaa70687216b53bd2cbd798",
            label: "Encoded address",
          }),
        },
      }),
    execute: ({ values }) => Promise.resolve(decodeAddressRecord(values)),
    id: "utilities.decodeAddressRecord",
    label: "decodeAddressRecord",
  }),
  "utilities.encodeContentHash": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          protocol: selectField({
            initialValue: "ipfs",
            label: "Protocol",
            options: [
              { label: "IPFS", value: "ipfs" },
              { label: "IPNS", value: "ipns" },
              { label: "Swarm", value: "swarm" },
            ],
          }),
          value: textField({
            initialValue: "bafybeigwepyt4j7hbnrj3fyi263cu53kx2jrdqsgrsbdonnzl62t6xrxz4",
            label: "Content identifier",
          }),
        },
      }),
    execute: ({ values }) => Promise.resolve(encodeContentHash(values)),
    id: "utilities.encodeContentHash",
    label: "encodeContentHash",
  }),
  "utilities.decodeContentHash": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          contentHash: hexField({
            initialValue:
              "0xe30101701220d623f13e27e70b629d9708d7b62a776abe9311c2468c823735b95fb53f5e37cf",
            label: "Encoded content hash",
          }),
        },
      }),
    execute: ({ values }) => Promise.resolve(decodeContentHash(values.contentHash)),
    id: "utilities.decodeContentHash",
    label: "decodeContentHash",
  }),
} as const;
