import { defineVitestConfig } from "klarity/vitest";

export default defineVitestConfig({
  resolve: {
    conditions: ["workspace-source"],
  },
  test: {
    fileParallelism: false,
    include: ["test/live/mainnet/**/*.test.ts"],
    maxWorkers: 1,
    testTimeout: 45_000,
  },
});
