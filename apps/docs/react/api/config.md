---
title: Config
description: Configure the SDK and query defaults used by ensforge React.
---

# Config

`EnsforgeProvider` accepts the same viem-or-Wagmi configuration as the SDK.

## viem

```tsx
<EnsforgeProvider
  config={{
    network: "mainnet",
    publicClient,
    walletClient,
  }}
>
  <App />
</EnsforgeProvider>
```

## Wagmi

```tsx
<EnsforgeProvider config={{ network: "mainnet", wagmiConfig }}>
  <App />
</EnsforgeProvider>
```

## Existing SDK

```tsx
<EnsforgeProvider sdk={sdk}>
  <App />
</EnsforgeProvider>
```

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

Per-hook `query` options override provider defaults.
