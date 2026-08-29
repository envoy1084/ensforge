import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import llmstxt from "vitepress-plugin-llms";

import { sidebar } from "./sidebar.js";

const siteUrl = process.env.DOCS_URL ?? "https://ensforge.dev";

export default defineConfig({
  cleanUrls: true,
  description: "Type-safe tools for reading, writing, and building applications on ENS.",
  head: [
    ["link", { href: "/favicon.svg", rel: "icon", type: "image/svg+xml" }],
    ["meta", { content: "#315cf5", name: "theme-color" }],
    ["meta", { content: "website", property: "og:type" }],
    ["meta", { content: siteUrl, property: "og:url" }],
    ["meta", { content: `${siteUrl}/og.png`, property: "og:image" }],
    ["meta", { content: "image/png", property: "og:image:type" }],
    ["meta", { content: "1200", property: "og:image:width" }],
    ["meta", { content: "630", property: "og:image:height" }],
    ["meta", { content: "summary_large_image", name: "twitter:card" }],
    ["meta", { content: `${siteUrl}/og.png`, name: "twitter:image" }],
  ],
  ignoreDeadLinks: false,
  lang: "en-US",
  lastUpdated: true,
  markdown: {
    config(markdown) {
      markdown.use(groupIconMdPlugin);
    },
    theme: {
      dark: "vitesse-dark",
      light: "vitesse-light",
    },
  },
  sitemap: { hostname: siteUrl },
  srcExclude: ["README.md"],
  themeConfig: {
    editLink: {
      pattern: "https://github.com/envoy1084/ensforge/edit/main/apps/docs/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      copyright: "Copyright © 2026 ensforge contributors",
      message:
        'Released under the <a href="https://github.com/envoy1084/ensforge/blob/main/LICENSE">Apache-2.0 License</a>.',
    },
    logo: {
      alt: "ensforge",
      dark: "/brand/wordmark-dark.svg",
      light: "/brand/wordmark-light.svg",
    },
    nav: [
      { link: "/core/getting-started", text: "Core" },
      { link: "/sdk/getting-started", text: "SDK" },
      { link: "/react/getting-started", text: "React" },
      { link: "/contracts/getting-started", text: "Contracts" },
      {
        items: [
          {
            link: "https://github.com/envoy1084/ensforge",
            text: '<span class="nav-brand-link nav-github">GitHub</span>',
          },
          {
            link: "https://www.npmjs.com/org/ensforge",
            text: '<span class="nav-brand-link nav-npm">npm</span>',
          },
          { link: "https://github.com/envoy1084/ensforge/releases", text: "Releases" },
          { link: "https://github.com/envoy1084/ensforge/discussions", text: "Discussions" },
        ],
        text: "More",
      },
    ],
    outline: [2, 3],
    search: {
      provider: "local",
      options: {
        detailedView: true,
        miniSearch: {
          searchOptions: {
            boost: { text: 2, title: 4, titles: 3 },
            fuzzy: 0.2,
            prefix: true,
          },
        },
      },
    },
    sidebar,
    siteTitle: false,
    socialLinks: [{ icon: "github", link: "https://github.com/envoy1084/ensforge" }],
  },
  title: "ensforge",
  titleTemplate: ":title | ensforge",
  transformHead({ pageData }) {
    const canonicalUrl = new URL(pageData.relativePath.replace(/index\.md$/, ""), `${siteUrl}/`);
    const socialTitle = pageData.title === "ensforge" ? "ensforge" : `${pageData.title} | ensforge`;
    const socialDescription =
      pageData.description || "Type-safe tools for building applications on ENS.";
    return [
      ["link", { href: canonicalUrl.href.replace(/\.md$/, ""), rel: "canonical" }],
      ["meta", { content: socialTitle, property: "og:title" }],
      ["meta", { content: socialDescription, property: "og:description" }],
      ["meta", { content: socialTitle, name: "twitter:title" }],
      ["meta", { content: socialDescription, name: "twitter:description" }],
    ];
  },
  vite: {
    plugins: [
      llmstxt({
        description: "Type-safe TypeScript tools for ENS",
        ignoreFiles: ["README.md", "snippets/"],
      }),
      groupIconVitePlugin(),
    ],
  },
});
