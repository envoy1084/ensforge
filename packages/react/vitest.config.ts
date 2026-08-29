import { defineVitestConfig } from "klarity/vitest";

export default defineVitestConfig({
  test: {
    environment: "happy-dom",
    include: ["test/**/*.test.ts", "test/**/*.test.tsx"],
    passWithNoTests: false,
  },
});
