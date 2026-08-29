import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import type { EnhanceAppContext, Theme } from "vitepress";
import CopyOrDownloadAsMarkdownButtons from "vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue";
import DefaultTheme from "vitepress/theme";

import "virtual:uno.css";
import "virtual:group-icons.css";
import "@shikijs/vitepress-twoslash/style.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("CopyOrDownloadAsMarkdownButtons", CopyOrDownloadAsMarkdownButtons);
    app.use(TwoslashFloatingVue);
  },
} satisfies Theme;
