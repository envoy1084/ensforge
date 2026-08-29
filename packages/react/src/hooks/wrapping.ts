"use client";

import {
  getFusesAtom,
  getWrapperExpiryAtom,
  createExtendSubnameExpiryMutationAtom,
  createSetChildFusesMutationAtom,
  createSetFusesMutationAtom,
  createUnwrapNameMutationAtom,
  createWrapNameMutationAtom,
} from "../atoms/wrapping.js";
import { makeMutationHook } from "./use-mutation.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useFuses = makeQueryHook(getFusesAtom);
export const useFusesSuspense = makeSuspenseQueryHook(getFusesAtom);
export const useWrapperExpiry = makeQueryHook(getWrapperExpiryAtom);
export const useWrapperExpirySuspense = makeSuspenseQueryHook(getWrapperExpiryAtom);

export const useExtendSubnameExpiry = makeMutationHook(createExtendSubnameExpiryMutationAtom);
export const useSetChildFuses = makeMutationHook(createSetChildFusesMutationAtom);
export const useSetFuses = makeMutationHook(createSetFusesMutationAtom);
export const useUnwrapName = makeMutationHook(createUnwrapNameMutationAtom);
export const useWrapName = makeMutationHook(createWrapNameMutationAtom);
