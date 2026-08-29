import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/jetbrains-mono";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import ResolutionPath from "./components/ResolutionPath.vue";

import "./styles.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("ResolutionPath", ResolutionPath);
  },
} satisfies Theme;
