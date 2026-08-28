import defineConfig from "klarity/tsdown/library";
import type { UserConfig } from "tsdown";

export default defineConfig({
  alias: { "#/": "./src/" },
  entry: { index: "src/index.ts", verify: "src/verify.ts" },
  exports: { devExports: "workspace-source" },
  platform: "node",
  unbundle: true,
  publint: false,
  attw: false,
}) as UserConfig;
