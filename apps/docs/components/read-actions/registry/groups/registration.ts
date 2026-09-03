import { defineForm } from "../../../form/define-form";
import { defaultNameByNetwork, zeroAddress } from "../../../runtime/network";
import { addressField, bytes32Field, durationField, ensNameField } from "../shared-fields";
import { defineReadAction } from "../types";

const registrationForm = (network: "mainnet" | "sepolia") =>
  defineForm({
    fields: {
      name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
      duration: durationField(),
      owner: addressField({ initialValue: zeroAddress, label: "Owner" }),
      secret: bytes32Field("Secret"),
    },
  });

export const definitions = {
  "registration.getCommitmentStatus": defineReadAction({
    createForm: () => defineForm({ fields: { commitment: bytes32Field("Commitment") } }),
    execute: ({ sdk, values }) =>
      sdk.registration.getCommitmentStatus({ commitment: values.commitment }),
    id: "registration.getCommitmentStatus",
    label: "getCommitmentStatus",
  }),
  "registration.getRegistrationParameters": defineReadAction({
    createForm: () => defineForm({ fields: {} }),
    execute: ({ sdk }) => sdk.registration.getRegistrationParameters({}),
    id: "registration.getRegistrationParameters",
    label: "getRegistrationParameters",
  }),
  "registration.getRegistrationPlan": defineReadAction({
    createForm: registrationForm,
    execute: ({ sdk, values }) => sdk.registration.getRegistrationPlan(values),
    id: "registration.getRegistrationPlan",
    label: "getRegistrationPlan",
  }),
  "registration.getRegistrationPrice": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          duration: durationField(),
        },
      }),
    execute: ({ sdk, values }) => sdk.registration.getRegistrationPrice(values),
    id: "registration.getRegistrationPrice",
    label: "getRegistrationPrice",
  }),
  "registration.getRenewalPrice": defineReadAction({
    createForm: (network) =>
      defineForm({
        fields: {
          name: ensNameField({ initialValue: defaultNameByNetwork[network], label: "Name" }),
          duration: durationField(),
        },
      }),
    execute: ({ sdk, values }) => sdk.registration.getRenewalPrice(values),
    id: "registration.getRenewalPrice",
    label: "getRenewalPrice",
  }),
  "registration.isPaymentTokenSupported": defineReadAction({
    createForm: () =>
      defineForm({
        fields: {
          paymentToken: addressField({ initialValue: zeroAddress, label: "Payment token" }),
        },
      }),
    execute: ({ sdk, values }) => sdk.registration.isPaymentTokenSupported(values),
    id: "registration.isPaymentTokenSupported",
    label: "isPaymentTokenSupported",
  }),
  "registration.makeRegistrationCommitment": defineReadAction({
    createForm: registrationForm,
    execute: ({ sdk, values }) => sdk.registration.makeRegistrationCommitment(values),
    id: "registration.makeRegistrationCommitment",
    label: "makeRegistrationCommitment",
  }),
} as const;
