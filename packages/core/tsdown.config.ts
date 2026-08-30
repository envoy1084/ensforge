import defineConfig from "klarity/tsdown/library";
import type { UserConfig } from "tsdown";

export default defineConfig({
  alias: { "#/": "./src/" },
  entry: {
    batch: "src/actions/batch/index.ts",
    capabilities: "src/actions/capabilities/index.ts",
    dns: "src/actions/dns/index.ts",
    events: "src/actions/events/index.ts",
    index: "src/index.ts",
    migration: "src/actions/migration/index.ts",
    name: "src/actions/name/index.ts",
    ownership: "src/actions/ownership/index.ts",
    permissions: "src/actions/permissions/index.ts",
    records: "src/actions/records/index.ts",
    registration: "src/actions/registration/index.ts",
    resolution: "src/actions/resolution/index.ts",
    reverse: "src/actions/reverse/index.ts",
    subnames: "src/actions/subnames/index.ts",
    testing: "src/testing/index.ts",
    wrapping: "src/actions/wrapping/index.ts",
  },
  exports: {
    devExports: "workspace-source",
    exclude: ["testing"],
    customExports: (exports, { isPublish }) =>
      isPublish
        ? exports
        : {
            ...exports,
            "./testing": {
              "workspace-source": "./src/testing/index.ts",
              default: "./dist/testing.js",
            },
          },
  },
  unbundle: true,
  publint: "ci-only",
  attw: {
    enabled: "ci-only",
    level: "error",
    profile: "esm-only",
  },
}) as UserConfig;
