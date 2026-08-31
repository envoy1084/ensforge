<script setup lang="ts">
import type { Root } from "react-dom/client";

import { onBeforeUnmount, onMounted, ref } from "vue";

const container = ref<HTMLElement>();
let root: Root | undefined;

onMounted(async () => {
  if (!container.value) return;

  const [{ createElement }, { createRoot }, { WalletConnectButton }, { WalletProviders }] =
    await Promise.all([
      import("react"),
      import("react-dom/client"),
      import("./wallet-connect-button"),
      import("./providers"),
    ]);

  root = createRoot(container.value);
  root.render(createElement(WalletProviders, null, createElement(WalletConnectButton)));
});

onBeforeUnmount(() => {
  root?.unmount();
});
</script>

<template>
  <div ref="container" class="wallet-connect-nav" />
</template>
