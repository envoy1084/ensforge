import defineConfig from "klarity/tsdown/library";
import type { UserConfig } from "tsdown";

export default defineConfig({
  alias: { "#/": "./src/" },
  entry: {
    batch: "src/entrypoints/batch.ts",
    capabilities: "src/entrypoints/capabilities.ts",
    dns: "src/entrypoints/dns.ts",
    events: "src/entrypoints/events.ts",
    index: "src/index.ts",
    indexer: "src/entrypoints/indexer.ts",
    migration: "src/entrypoints/migration.ts",
    name: "src/entrypoints/name.ts",
    ownership: "src/entrypoints/ownership.ts",
    permissions: "src/entrypoints/permissions.ts",
    records: "src/entrypoints/records.ts",
    registration: "src/entrypoints/registration.ts",
    resolution: "src/entrypoints/resolution.ts",
    reverse: "src/entrypoints/reverse.ts",
    subnames: "src/entrypoints/subnames.ts",
    wagmi: "src/wagmi.ts",
    wrapping: "src/entrypoints/wrapping.ts",
  },
  exports: { devExports: "workspace-source" },
  unbundle: true,
  publint: "ci-only",
  attw: {
    enabled: "ci-only",
    level: "error",
    profile: "esm-only",
  },
}) as UserConfig;
