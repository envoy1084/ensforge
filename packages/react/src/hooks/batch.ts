"use client";

import {
  estimateCallsAtom,
  getCallsStatusAtom,
  getWalletCapabilitiesAtom,
  prepareCallsAtom,
  simulateCallsAtom,
  createExecuteWritePlanMutationAtom,
  createResumeCallsMutationAtom,
  createSendCallsMutationAtom,
} from "../atoms/batch.js";
import { makeMutationHook } from "./use-mutation.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useEstimateCalls = makeQueryHook(estimateCallsAtom);
export const useEstimateCallsSuspense = makeSuspenseQueryHook(estimateCallsAtom);
export const useCallsStatus = makeQueryHook(getCallsStatusAtom);
export const useCallsStatusSuspense = makeSuspenseQueryHook(getCallsStatusAtom);
export const useWalletCapabilities = makeQueryHook(getWalletCapabilitiesAtom);
export const useWalletCapabilitiesSuspense = makeSuspenseQueryHook(getWalletCapabilitiesAtom);
export const usePrepareCalls = makeQueryHook(prepareCallsAtom);
export const usePrepareCallsSuspense = makeSuspenseQueryHook(prepareCallsAtom);
export const useSimulateCalls = makeQueryHook(simulateCallsAtom);
export const useSimulateCallsSuspense = makeSuspenseQueryHook(simulateCallsAtom);

export const useExecuteWritePlan = makeMutationHook(createExecuteWritePlanMutationAtom);
export const useResumeCalls = makeMutationHook(createResumeCallsMutationAtom);
export const useSendCalls = makeMutationHook(createSendCallsMutationAtom);
