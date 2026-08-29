import { createTwoslashWithInlineCache } from "@shikijs/vitepress-twoslash/cache-inline";
import unocss from "unocss/vite";
import { defineConfig } from "vitepress";
import { groupIconMdPlugin, groupIconVitePlugin } from "vitepress-plugin-group-icons";
import llmstxt, { copyOrDownloadAsMarkdownButtons } from "vitepress-plugin-llms";

import { sidebar } from "./sidebar.js";

const configuredSiteUrl =
  process.env.SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.DOCS_URL ??
  "https://ensforge.vercel.app";
const siteUrl =
  `${configuredSiteUrl.startsWith("http") ? "" : "https://"}${configuredSiteUrl}`.replace(
    /\/+$/,
    "",
  );
const siteDescription =
  "Type-safe TypeScript SDK for ENS names, records, registration, renewals, migration, React hooks, batching, and ENSv1 and ENSv2 contracts.";
const withTwoslashInlineCache = createTwoslashWithInlineCache();

const searchSectionLabels = [
  ["core/", "Core"],
  ["sdk/", "SDK"],
  ["react/", "React"],
  ["contracts/", "Contracts"],
] as const;

function getSearchSectionLabel(file: string) {
  const normalizedFile = file.replaceAll("\\", "/");
  return searchSectionLabels.find(([directory]) =>
    normalizedFile.includes(`/docs/${directory}`),
  )?.[1];
}

const headingRegex = /<h(\d*).*?>(.*?<a.*? href="#.*?".*?>.*?<\/a>)<\/h\1>/gi;
const headingContentRegex = /(.*?)<a.*? href="#(.*?)".*?>.*?<\/a>/i;

function clearHtmlTags(value: string) {
  return value.replace(/<[^>]*>/g, "");
}

function* splitSearchPageIntoSections(html: string, sectionLabel?: string) {
  const result = html.split(headingRegex);
  result.shift();
  let parentTitles: Array<string> = [];

  for (let index = 0; index < result.length; index += 3) {
    const levelText = result[index];
    const heading = result[index + 1];
    if (!levelText || !heading) continue;
    const level = Number.parseInt(levelText, 10) - 1;
    const headingResult = headingContentRegex.exec(heading);
    const title = clearHtmlTags(headingResult?.[1] ?? "").trim();
    const anchor = headingResult?.[2] ?? "";
    const content = result[index + 2];
    if (!title || !content) continue;

    const titles = parentTitles.slice(0, level);
    titles[level] = title;
    const filteredTitles = titles.filter(Boolean);
    if (sectionLabel) filteredTitles.unshift(sectionLabel);
    yield { anchor, text: clearHtmlTags(content), titles: filteredTitles };

    if (level === 0) parentTitles = [title];
    else parentTitles[level] = title;
  }
}

export default withTwoslashInlineCache(
  defineConfig({
    cleanUrls: true,
    description: siteDescription,
    head: [
      ["link", { href: "/favicon.svg", rel: "icon", sizes: "any", type: "image/svg+xml" }],
      ["link", { href: "/site.webmanifest", rel: "manifest" }],
      [
        "link",
        {
          href: "/llms.txt",
          rel: "alternate",
          title: "ensforge documentation for LLMs",
          type: "text/plain",
        },
      ],
      ["meta", { content: "#315cf5", name: "theme-color" }],
      ["meta", { content: "index, follow", name: "robots" }],
      [
        "meta",
        {
          content:
            "ENS, Ethereum Name Service, ENS SDK, TypeScript, React hooks, viem, ENSv2, web3, Ethereum",
          name: "keywords",
        },
      ],
      ["meta", { content: "website", property: "og:type" }],
      ["meta", { content: "ensforge", property: "og:site_name" }],
      ["meta", { content: "en_US", property: "og:locale" }],
      ["meta", { content: `${siteUrl}/og.png`, property: "og:image" }],
      ["meta", { content: "image/png", property: "og:image:type" }],
      ["meta", { content: "1200", property: "og:image:width" }],
      ["meta", { content: "630", property: "og:image:height" }],
      ["meta", { content: "ensforge", property: "og:image:alt" }],
      ["meta", { content: "summary_large_image", name: "twitter:card" }],
      ["meta", { content: `${siteUrl}/og.png`, name: "twitter:image" }],
      ["meta", { content: "ensforge", name: "twitter:image:alt" }],
      [
        "script",
        { type: "application/ld+json" },
        JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          applicationCategory: "DeveloperApplication",
          codeRepository: "https://github.com/envoy1084/ensforge",
          description: siteDescription,
          license: "https://www.apache.org/licenses/LICENSE-2.0",
          name: "ensforge",
          programmingLanguage: "TypeScript",
          url: siteUrl,
        }),
      ],
    ],
    ignoreDeadLinks: false,
    lang: "en-US",
    lastUpdated: true,
    outDir: "./dist",
    markdown: {
      config(markdown) {
        markdown.use(copyOrDownloadAsMarkdownButtons).use(groupIconMdPlugin);
      },
      languages: ["js", "jsx", "ts", "tsx"],
      theme: {
        dark: "vitesse-dark",
        light: "vitesse-light",
      },
    },
    sitemap: { hostname: siteUrl, lastmodDateOnly: true },
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
        { link: "/react/getting-started", text: "React" },
        { link: "/sdk/getting-started", text: "SDK" },
        { link: "/core/getting-started", text: "Core" },
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
          _render(source, environment, markdown) {
            const html = markdown.render(source, environment);
            if (environment.frontmatter?.search === false) return "";
            if (environment.relativePath.startsWith("snippets")) return "";
            return html;
          },
          miniSearch: {
            _splitIntoSections(file, html) {
              return splitSearchPageIntoSections(html, getSearchSectionLabel(file));
            },
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
      const socialTitle =
        pageData.title === "ensforge" ? "ensforge" : `${pageData.title} | ensforge`;
      const socialDescription = pageData.description || siteDescription;
      const canonicalHref = canonicalUrl.href.replace(/\.md$/, "");
      return [
        ["link", { href: canonicalHref, rel: "canonical" }],
        ["meta", { content: canonicalHref, property: "og:url" }],
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
        unocss(),
      ],
    },
  }),
);
