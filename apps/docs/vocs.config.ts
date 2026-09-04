import { defineConfig, McpSource } from "vocs/config";

import { interactiveOutput } from "./markdown/interactive-output.js";
import { sidebar } from "./sidebar.js";

const configuredSiteUrl =
  process.env.SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.DOCS_URL ??
  "https://ensforge.com";
const siteUrl =
  `${configuredSiteUrl.startsWith("http") ? "" : "https://"}${configuredSiteUrl}`.replace(
    /\/+$/,
    "",
  );

const description =
  "A type-safe TypeScript SDK for ENS names, records, registration, renewals, migration, batching, React, and ENS contracts.";

export default defineConfig({
  accentColor: "light-dark(#d95712, #ffb21c)",
  baseUrl: process.env.NODE_ENV === "production" ? siteUrl : undefined,
  checkDeadlinks: true,
  description,
  editLink: {
    link: "https://github.com/thenamespace/ensforge/edit/main/apps/docs/pages/:path",
    text: "Suggest changes to this page",
  },
  head: (_path, { frontmatter }) => ({
    canonical:
      typeof frontmatter?.canonical === "string"
        ? new URL(frontmatter.canonical, siteUrl).href
        : undefined,
    link: [{ href: "/site.webmanifest", rel: "manifest" }],
    meta: {
      keywords:
        "ENS, Ethereum Name Service, ENS SDK, TypeScript, React hooks, viem, ENSv2, web3, Ethereum",
      themeColor: "#d95712",
    },
  }),
  iconUrl: "/favicon.svg",
  logoUrl: {
    dark: "/brand/wordmark-dark.svg",
    light: "/brand/wordmark-light.svg",
  },
  markdown: {
    outputRemarkPlugins: [interactiveOutput],
  },
  mcp: {
    enabled: true,
    sources: [McpSource.github({ name: "ensforge", repo: "thenamespace/ensforge" })],
  },
  ogImageUrl: (_path, { baseUrl }) =>
    `${baseUrl ?? ""}/api/og?title=%title&description=%description`,
  renderStrategy: "dynamic",
  rootDir: ".",
  search: {
    boostDocument(documentId) {
      if (documentId.startsWith("pages/react")) return 4;
      if (documentId.startsWith("pages/sdk")) return 3;
      if (documentId.startsWith("pages/core")) return 2;
      return 1;
    },
  },
  sidebar,
  sitemap: {
    include: (path) => !path.endsWith("-suspense"),
    lastmod: true,
  },
  socials: [{ icon: "github", link: "https://github.com/thenamespace/ensforge" }],
  srcDir: ".",
  title: "ensforge",
  titleTemplate: "%s | ensforge",
  topNav: [
    { link: "/react/getting-started", text: "React" },
    { link: "/sdk/getting-started", text: "SDK" },
    { link: "/core/getting-started", text: "Core" },
    { link: "/contracts/getting-started", text: "Contracts" },
    {
      items: [
        { external: true, link: "https://www.npmjs.com/org/ensforge", text: "npm" },
        {
          external: true,
          link: "https://github.com/thenamespace/ensforge/releases",
          text: "Releases",
        },
        {
          external: true,
          link: "https://github.com/thenamespace/ensforge/discussions",
          text: "Discussions",
        },
      ],
      text: "More",
    },
  ],
});
