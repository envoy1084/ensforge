<script setup lang="ts">
import type { Root } from "react-dom/client";

import { onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{ action: string }>();
const container = ref<HTMLElement>();
let root: Root | undefined;

onMounted(async () => {
  if (!container.value) return;

  const [{ createElement }, { createRoot }, { ReadActionDemo }] = await Promise.all([
    import("react"),
    import("react-dom/client"),
    import("./read-action-demo"),
  ]);

  root = createRoot(container.value);
  root.render(createElement(ReadActionDemo, { action: props.action }));
});

onBeforeUnmount(() => {
  root?.unmount();
});
</script>

<template>
  <div ref="container" />
</template>
