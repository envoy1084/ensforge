import { defineVitestConfig } from "klarity/vitest";

export default defineVitestConfig({
  test: {
    include: ["test/unit/**/*.test.ts"],
    passWithNoTests: true,
  },
});
