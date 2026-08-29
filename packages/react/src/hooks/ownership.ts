"use client";

import {
  getTtlAtom,
  createReclaimNameMutationAtom,
  createSetManagerMutationAtom,
  createSetTtlMutationAtom,
  createTransferNameMutationAtom,
  createTransferRegistrantMutationAtom,
} from "../atoms/ownership.js";
import { makeMutationHook } from "./use-mutation.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useTtl = makeQueryHook(getTtlAtom);
export const useTtlSuspense = makeSuspenseQueryHook(getTtlAtom);

export const useReclaimName = makeMutationHook(createReclaimNameMutationAtom);
export const useSetManager = makeMutationHook(createSetManagerMutationAtom);
export const useSetTtl = makeMutationHook(createSetTtlMutationAtom);
export const useTransferName = makeMutationHook(createTransferNameMutationAtom);
export const useTransferRegistrant = makeMutationHook(createTransferRegistrantMutationAtom);
