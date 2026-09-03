import "@thenamespace/uikit/styles.css";
import "@rainbow-me/rainbowkit/styles.css";
import TwoslashFloatingVue from "@shikijs/vitepress-twoslash/client";
import type { EnhanceAppContext, Theme } from "vitepress";
import CopyOrDownloadAsMarkdownButtons from "vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue";
import DefaultTheme from "vitepress/theme";

import ReadActionDemo from "./read-actions/read-action-demo.vue";
import WalletConnectButton from "./wallet-connect/wallet-connect-button.vue";

import "virtual:group-icons.css";
import "@shikijs/vitepress-twoslash/style.css";
import "./styles/demo.css";
import "virtual:uno.css";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("CopyOrDownloadAsMarkdownButtons", CopyOrDownloadAsMarkdownButtons);
    app.component("ReadActionDemo", ReadActionDemo);
    app.component("WalletConnectButton", WalletConnectButton);
    app.use(TwoslashFloatingVue);
  },
} satisfies Theme;
