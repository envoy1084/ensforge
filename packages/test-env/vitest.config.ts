import { defineVitestConfig } from "klarity/vitest";

export default defineVitestConfig({
  resolve: {
    conditions: ["workspace-source"],
  },
  ssr: {
    resolve: {
      conditions: ["workspace-source"],
    },
  },
  test: {
    exclude: ["test/integration/**", "node_modules/**", "dist/**"],
    passWithNoTests: false,
  },
});
