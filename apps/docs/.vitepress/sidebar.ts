import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Sidebar = {
  "/core/": [
    {
      items: [
        { link: "/core/why", text: "Why Ensforge" },
        { link: "/core/installation", text: "Installation" },
        { link: "/core/getting-started", text: "Getting Started" },
        { link: "/core/effect", text: "Effect" },
      ],
      text: "Introduction",
    },
    {
      items: [
        { link: "/core/guides/effect", text: "Effect" },
        { link: "/core/guides/error-handling", text: "Error Handling" },
        { link: "/core/guides/batching", text: "Batching" },
        { link: "/core/guides/protocol-routing", text: "Protocol Routing" },
        { link: "/core/guides/writes", text: "Writes" },
        { link: "/core/guides/faq", text: "FAQ" },
      ],
      text: "Guides",
    },
    {
      items: [
        { link: "/core/api/create-config", text: "createConfig" },
        { link: "/core/api/config", text: "Config" },
      ],
      text: "Configuration",
    },
    {
      collapsed: false,
      items: [
        { link: "/core/api/actions/name/get-canonical-resource", text: "getCanonicalResource" },
        { link: "/core/api/actions/name/get-expiry", text: "getExpiry" },
        { link: "/core/api/actions/name/get-manager", text: "getManager" },
        { link: "/core/api/actions/name/get-name-state", text: "getNameState" },
        { link: "/core/api/actions/name/get-name-status", text: "getNameStatus" },
        { link: "/core/api/actions/name/get-owner", text: "getOwner" },
        { link: "/core/api/actions/name/get-protocol", text: "getProtocol" },
        { link: "/core/api/actions/name/get-registrant", text: "getRegistrant" },
        { link: "/core/api/actions/name/get-registry", text: "getRegistry" },
        { link: "/core/api/actions/name/get-token-id", text: "getTokenId" },
        { link: "/core/api/actions/name/is-available", text: "isAvailable" },
        { link: "/core/api/actions/name/is-migrated", text: "isMigrated" },
        { link: "/core/api/actions/name/is-renewable", text: "isRenewable" },
        { link: "/core/api/actions/name/is-reserved", text: "isReserved" },
        { link: "/core/api/actions/name/is-wrapped", text: "isWrapped" },
      ],
      text: "Name Actions",
    },
  ],
  "/sdk/": [
    {
      items: [
        { link: "/sdk/why", text: "Why Ensforge" },
        { link: "/sdk/installation", text: "Installation" },
        { link: "/sdk/getting-started", text: "Getting Started" },
        { link: "/sdk/effect", text: "Effect" },
      ],
      text: "Introduction",
    },
  ],
  "/react/": [
    {
      items: [
        { link: "/react/why", text: "Why Ensforge" },
        { link: "/react/installation", text: "Installation" },
        { link: "/react/getting-started", text: "Getting Started" },
        { link: "/react/effect", text: "Effect" },
      ],
      text: "Introduction",
    },
  ],
  "/contracts/": [
    {
      items: [
        { link: "/contracts/why", text: "Why Ensforge" },
        { link: "/contracts/installation", text: "Installation" },
        { link: "/contracts/getting-started", text: "Getting Started" },
      ],
      text: "Introduction",
    },
  ],
};
