import {
  approveMigration,
  getMigrationEligibility,
  getMigrationPlan,
  getMigrationStatus,
  getMigrationTarget,
  migrateName,
  migrateNames,
  type EnsforgeConfig,
} from "@ensforge/core";

import { bindAction } from "../internal/bind-action.js";

export const makeMigrationActions = (config: EnsforgeConfig) =>
  Object.freeze({
    approveMigration: bindAction(config, approveMigration),
    getMigrationEligibility: bindAction(config, getMigrationEligibility),
    getMigrationPlan: bindAction(config, getMigrationPlan),
    getMigrationStatus: bindAction(config, getMigrationStatus),
    getMigrationTarget: bindAction(config, getMigrationTarget),
    migrateName: bindAction(config, migrateName),
    migrateNames: bindAction(config, migrateNames),
  });

export type MigrationActions = ReturnType<typeof makeMigrationActions>;
