import defineConfig from "klarity/tsdown/library";
import type { UserConfig } from "tsdown";

export default defineConfig({
  alias: { "#/": "./src/" },
  entry: {
    deployments: "src/deployments/index.ts",
    index: "src/index.ts",
    "resolver-profiles": "src/shared/resolver-profiles/index.ts",
    shared: "src/shared/index.ts",
    v1: "src/v1/index.ts",
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
