<script setup lang="ts">
import type { Root } from "react-dom/client";

import { onBeforeUnmount, onMounted, ref } from "vue";

import type { ReadActionId } from "./definitions";

import styles from "./tailwind.css?inline";

const props = defineProps<{ action: ReadActionId }>();
const container = ref<HTMLElement>();
let root: Root | undefined;
let themeObserver: MutationObserver | undefined;

onMounted(async () => {
  if (!container.value) return;

  const shadowRoot = container.value.attachShadow({ mode: "open" });
  const style = document.createElement("style");
  const mount = document.createElement("div");
  const syncTheme = () => {
    mount.className = document.documentElement.classList.contains("dark") ? "dark" : "light";
  };

  style.textContent = styles;
  syncTheme();
  shadowRoot.append(style, mount);

  themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, {
    attributeFilter: ["class"],
    attributes: true,
  });

  const [{ createElement }, { createRoot }, { ReadActionDemo }] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    import("./read-action-demo"),
  ]);

  root = createRoot(mount);
  root.render(createElement(ReadActionDemo, { action: props.action }));
});

onBeforeUnmount(() => {
  themeObserver?.disconnect();
  root?.unmount();
});
</script>

<template>
  <div ref="container" />
</template>
