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
    fileParallelism: false,
    include: ["test/integration/**/*.test.ts"],
    passWithNoTests: false,
    sequence: {
      concurrent: false,
    },
  },
});
