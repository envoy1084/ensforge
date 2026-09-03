import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";

const tslib = fileURLToPath(import.meta.resolve("tslib/tslib.es6.js"));

export default defineConfig({
  resolve: {
    alias: { tslib },
  },
});
