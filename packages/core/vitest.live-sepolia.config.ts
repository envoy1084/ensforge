import { defineVitestConfig } from "klarity/vitest";

export default defineVitestConfig({
  resolve: {
    conditions: ["workspace-source"],
  },
  test: {
    fileParallelism: false,
    include: ["test/live/sepolia/**/*.test.ts"],
    maxWorkers: 1,
    testTimeout: 90_000,
  },
});
