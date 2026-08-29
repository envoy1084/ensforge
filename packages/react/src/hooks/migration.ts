"use client";

import {
  getMigrationEligibilityAtom,
  getMigrationPlanAtom,
  getMigrationStatusAtom,
  getMigrationTargetAtom,
  createApproveMigrationMutationAtom,
  createMigrateNameMutationAtom,
  createMigrateNamesMutationAtom,
} from "../atoms/migration.js";
import { makeMutationHook } from "./use-mutation.js";
import { makeQueryHook } from "./use-query.js";
import { makeSuspenseQueryHook } from "./use-suspense-query.js";

export const useMigrationEligibility = makeQueryHook(getMigrationEligibilityAtom);
export const useMigrationEligibilitySuspense = makeSuspenseQueryHook(getMigrationEligibilityAtom);
export const useMigrationPlan = makeQueryHook(getMigrationPlanAtom);
export const useMigrationPlanSuspense = makeSuspenseQueryHook(getMigrationPlanAtom);
export const useMigrationStatus = makeQueryHook(getMigrationStatusAtom);
export const useMigrationStatusSuspense = makeSuspenseQueryHook(getMigrationStatusAtom);
export const useMigrationTarget = makeQueryHook(getMigrationTargetAtom);
export const useMigrationTargetSuspense = makeSuspenseQueryHook(getMigrationTargetAtom);

export const useApproveMigration = makeMutationHook(createApproveMigrationMutationAtom);
export const useMigrateName = makeMutationHook(createMigrateNameMutationAtom);
export const useMigrateNames = makeMutationHook(createMigrateNamesMutationAtom);
