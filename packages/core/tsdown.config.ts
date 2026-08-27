import defineConfig from "klarity/tsdown/library";
import type { UserConfig } from "tsdown";

export default defineConfig({
  alias: { "#/": "./src/" },
  entry: { index: "src/index.ts", testing: "src/testing/index.ts" },
  exports: {
    devExports: "workspace-source",
    exclude: ["testing"],
    customExports: (exports, { isPublish }) =>
      isPublish
        ? exports
        : {
            ...exports,
            "./testing": { "workspace-source": "./src/testing/index.ts" },
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
