import defineConfig from "klarity/tsdown/library";
import type { UserConfig } from "tsdown";

export default defineConfig({
  alias: { "#/": "./src/" },
  entry: {
    index: "src/index.ts",
    atoms: "src/atoms/index.ts",
    cache: "src/cache/index.ts",
  },
  deps: { dts: { neverBundle: true } },
  exports: { devExports: "workspace-source" },
  unbundle: true,
  publint: "ci-only",
  attw: {
    enabled: "ci-only",
    level: "error",
    profile: "esm-only",
  },
}) as UserConfig;
