import { defineVitestConfig } from "klarity/vitest";

export default defineVitestConfig({
  test: {
    fileParallelism: false,
    include: ["test/integration/**/*.test.ts"],
    passWithNoTests: false,
  },
});
