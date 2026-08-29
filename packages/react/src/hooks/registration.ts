"use client";

import {
  getCommitmentStatusAtom,
  getRegistrationParametersAtom,
  getRegistrationPlanAtom,
  getRegistrationPriceAtom,
  getRenewalPriceAtom,
  isPaymentTokenSupportedAtom,
  makeRegistrationCommitmentAtom,
  createApprovePaymentTokenMutationAtom,
  createApproveRenewalPaymentMutationAtom,
  createCommitNameMutationAtom,
  createCompleteRegistrationMutationAtom,
  createRegisterNameMutationAtom,
  createRegisterNamesMutationAtom,
  createRenewNameMutationAtom,
  createRenewNamesMutationAtom,
} from "../atoms/registration.js";
import { makeMutationHook } from "./use-mutation.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useCommitmentStatus = makeQueryHook(getCommitmentStatusAtom);
export const useCommitmentStatusSuspense = makeSuspenseQueryHook(getCommitmentStatusAtom);
export const useRegistrationParameters = makeQueryHook(getRegistrationParametersAtom);
export const useRegistrationParametersSuspense = makeSuspenseQueryHook(
  getRegistrationParametersAtom,
);
export const useRegistrationPlan = makeQueryHook(getRegistrationPlanAtom);
export const useRegistrationPlanSuspense = makeSuspenseQueryHook(getRegistrationPlanAtom);
export const useRegistrationPrice = makeQueryHook(getRegistrationPriceAtom);
export const useRegistrationPriceSuspense = makeSuspenseQueryHook(getRegistrationPriceAtom);
export const useRenewalPrice = makeQueryHook(getRenewalPriceAtom);
export const useRenewalPriceSuspense = makeSuspenseQueryHook(getRenewalPriceAtom);
export const useIsPaymentTokenSupported = makeQueryHook(isPaymentTokenSupportedAtom);
export const useIsPaymentTokenSupportedSuspense = makeSuspenseQueryHook(
  isPaymentTokenSupportedAtom,
);
export const useRegistrationCommitment = makeQueryHook(makeRegistrationCommitmentAtom);
export const useRegistrationCommitmentSuspense = makeSuspenseQueryHook(
  makeRegistrationCommitmentAtom,
);

export const useApprovePaymentToken = makeMutationHook(createApprovePaymentTokenMutationAtom);
export const useApproveRenewalPayment = makeMutationHook(createApproveRenewalPaymentMutationAtom);
export const useCommitName = makeMutationHook(createCommitNameMutationAtom);
export const useCompleteRegistration = makeMutationHook(createCompleteRegistrationMutationAtom);
export const useRegisterName = makeMutationHook(createRegisterNameMutationAtom);
export const useRegisterNames = makeMutationHook(createRegisterNamesMutationAtom);
export const useRenewName = makeMutationHook(createRenewNameMutationAtom);
export const useRenewNames = makeMutationHook(createRenewNamesMutationAtom);
