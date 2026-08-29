"use client";

import {
  getCanonicalResourceAtom,
  getExpiryAtom,
  getManagerAtom,
  getNameStateAtom,
  getNameStatusAtom,
  getOwnerAtom,
  getProtocolAtom,
  getRegistrantAtom,
  getRegistryAtom,
  getTokenIdAtom,
  isAvailableAtom,
  isMigratedAtom,
  isRenewableAtom,
  isReservedAtom,
  isWrappedAtom,
} from "../atoms/name.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useCanonicalResource = makeQueryHook(getCanonicalResourceAtom);
export const useCanonicalResourceSuspense = makeSuspenseQueryHook(getCanonicalResourceAtom);
export const useExpiry = makeQueryHook(getExpiryAtom);
export const useExpirySuspense = makeSuspenseQueryHook(getExpiryAtom);
export const useManager = makeQueryHook(getManagerAtom);
export const useManagerSuspense = makeSuspenseQueryHook(getManagerAtom);
export const useNameState = makeQueryHook(getNameStateAtom);
export const useNameStateSuspense = makeSuspenseQueryHook(getNameStateAtom);
export const useNameStatus = makeQueryHook(getNameStatusAtom);
export const useNameStatusSuspense = makeSuspenseQueryHook(getNameStatusAtom);
export const useOwner = makeQueryHook(getOwnerAtom);
export const useOwnerSuspense = makeSuspenseQueryHook(getOwnerAtom);
export const useProtocol = makeQueryHook(getProtocolAtom);
export const useProtocolSuspense = makeSuspenseQueryHook(getProtocolAtom);
export const useRegistrant = makeQueryHook(getRegistrantAtom);
export const useRegistrantSuspense = makeSuspenseQueryHook(getRegistrantAtom);
export const useRegistry = makeQueryHook(getRegistryAtom);
export const useRegistrySuspense = makeSuspenseQueryHook(getRegistryAtom);
export const useTokenId = makeQueryHook(getTokenIdAtom);
export const useTokenIdSuspense = makeSuspenseQueryHook(getTokenIdAtom);
export const useIsAvailable = makeQueryHook(isAvailableAtom);
export const useIsAvailableSuspense = makeSuspenseQueryHook(isAvailableAtom);
export const useIsMigrated = makeQueryHook(isMigratedAtom);
export const useIsMigratedSuspense = makeSuspenseQueryHook(isMigratedAtom);
export const useIsRenewable = makeQueryHook(isRenewableAtom);
export const useIsRenewableSuspense = makeSuspenseQueryHook(isRenewableAtom);
export const useIsReserved = makeQueryHook(isReservedAtom);
export const useIsReservedSuspense = makeSuspenseQueryHook(isReservedAtom);
export const useIsWrapped = makeQueryHook(isWrappedAtom);
export const useIsWrappedSuspense = makeSuspenseQueryHook(isWrappedAtom);
