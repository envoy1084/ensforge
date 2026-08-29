import type { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Sidebar = {
  "/guide/": [
    {
      items: [{ link: "/guide/getting-started", text: "Getting started" }],
      text: "Learn",
    },
  ],
  "/core/": [
    {
      items: [{ link: "/core/", text: "Overview" }],
      text: "Core",
    },
  ],
  "/sdk/": [
    {
      items: [{ link: "/sdk/", text: "Overview" }],
      text: "SDK",
    },
  ],
  "/react/": [
    {
      items: [{ link: "/react/", text: "Overview" }],
      text: "React",
    },
  ],
  "/contracts/": [
    {
      items: [{ link: "/contracts/", text: "Overview" }],
      text: "Contracts",
    },
  ],
};
