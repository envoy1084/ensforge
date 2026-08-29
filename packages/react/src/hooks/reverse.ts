"use client";

import {
  getPrimaryNameAtom,
  createClearPrimaryNameMutationAtom,
  createSetContractPrimaryNameMutationAtom,
  createSetPrimaryNameMutationAtom,
  createSetPrimaryNameForAddressMutationAtom,
} from "../atoms/reverse.js";
import { makeMutationHook } from "./use-mutation.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const usePrimaryName = makeQueryHook(getPrimaryNameAtom);
export const usePrimaryNameSuspense = makeSuspenseQueryHook(getPrimaryNameAtom);

export const useClearPrimaryName = makeMutationHook(createClearPrimaryNameMutationAtom);
export const useSetContractPrimaryName = makeMutationHook(createSetContractPrimaryNameMutationAtom);
export const useSetPrimaryName = makeMutationHook(createSetPrimaryNameMutationAtom);
export const useSetPrimaryNameForAddress = makeMutationHook(
  createSetPrimaryNameForAddressMutationAtom,
);
