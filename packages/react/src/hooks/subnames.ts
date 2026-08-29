"use client";

import {
  createCreateSubnameMutationAtom,
  createDeleteSubnameMutationAtom,
  createSetSubnameExpiryMutationAtom,
  createSetSubnameManagerMutationAtom,
  createSetSubnameRecordMutationAtom,
  createSetSubnameResolverMutationAtom,
  createTransferSubnameMutationAtom,
} from "../atoms/subnames.js";
import { makeMutationHook } from "./use-mutation.js";

export const useCreateSubname = makeMutationHook(createCreateSubnameMutationAtom);
export const useDeleteSubname = makeMutationHook(createDeleteSubnameMutationAtom);
export const useSetSubnameExpiry = makeMutationHook(createSetSubnameExpiryMutationAtom);
export const useSetSubnameManager = makeMutationHook(createSetSubnameManagerMutationAtom);
export const useSetSubnameRecord = makeMutationHook(createSetSubnameRecordMutationAtom);
export const useSetSubnameResolver = makeMutationHook(createSetSubnameResolverMutationAtom);
export const useTransferSubname = makeMutationHook(createTransferSubnameMutationAtom);
