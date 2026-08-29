import { makeMutationAtom } from "./mutation.js";
import { makeQueryAtom } from "./query.js";

export const getMigrationEligibilityAtom = makeQueryAtom(
  "migration",
  (sdk) => sdk.migration.getMigrationEligibility,
);
export const getMigrationPlanAtom = makeQueryAtom(
  "migration",
  (sdk) => sdk.migration.getMigrationPlan,
);
export const getMigrationStatusAtom = makeQueryAtom(
  "migration",
  (sdk) => sdk.migration.getMigrationStatus,
);
export const getMigrationTargetAtom = makeQueryAtom(
  "migration",
  (sdk) => sdk.migration.getMigrationTarget,
);

export const createApproveMigrationMutationAtom = makeMutationAtom(
  "migration",
  (sdk) => sdk.migration.approveMigration,
);
export const createMigrateNameMutationAtom = makeMutationAtom(
  "migration",
  (sdk) => sdk.migration.migrateName,
);
export const createMigrateNamesMutationAtom = makeMutationAtom(
  "migration",
  (sdk) => sdk.migration.migrateNames,
);
