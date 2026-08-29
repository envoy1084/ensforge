---
title: Config
description: Configure clients, Wagmi, and query defaults for ensforge React.
---

# Config

`EnsforgeProvider` accepts the same mutually exclusive client configurations as the SDK.

## viem clients

::: code-group

```tsx [providers.tsx]
import { EnsforgeProvider } from "@ensforge/react";
import { publicClient, walletClient } from "./clients";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <EnsforgeProvider config={{ network: "mainnet", publicClient, walletClient }}>
      {children}
    </EnsforgeProvider>
  );
}
```

```ts [clients.ts]
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { mainnet } from "viem/chains";

export const publicClient = createPublicClient({ chain: mainnet, transport: http() });
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
```

:::

Omit `walletClient` for a read-only application.

## Wagmi

::: code-group

<<< @/snippets/react/provider.tsx

<<< @/snippets/wagmi/config.ts

:::

The active wallet is resolved when a mutation executes, so account and connector changes do not
require recreating the provider.

## Query defaults

```tsx
<EnsforgeProvider
  config={{ network: "mainnet", wagmiConfig }}
  defaults={{
    queries: {
      staleTime: 60_000,
      gcTime: 10 * 60_000,
      retry: 2,
      refetchOnWindowFocus: true,
    },
  }}
>
  <App />
</EnsforgeProvider>
```

See [Query Options](/react/api/query-options) for defaults and per-hook overrides.
