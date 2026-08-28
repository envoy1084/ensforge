import { defineVitestConfig } from "klarity/vitest";

export default defineVitestConfig({
  test: {
    fileParallelism: false,
    globalSetup: ["./test/integration/setup/global.ts"],
    hookTimeout: 180_000,
    include: ["test/integration/**/*.test.ts"],
    maxWorkers: 1,
    testTimeout: 30_000,
  },
});
