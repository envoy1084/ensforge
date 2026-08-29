# `@ensforge/react`

React providers and hooks for building ENSv2 applications with Ensforge.

## Installation

```sh
pnpm add @ensforge/react
```

## Provider

Pass the same configuration accepted by `Ensforge`:

```tsx
import { EnsforgeProvider } from "@ensforge/react";

<EnsforgeProvider
  config={{
    network: "mainnet",
    wagmiConfig,
  }}
>
  <App />
</EnsforgeProvider>;
```

You can also provide an existing SDK instance:

```tsx
<EnsforgeProvider sdk={sdk}>
  <App />
</EnsforgeProvider>
```

## Hooks

```tsx
import { useOwner, useSetText } from "@ensforge/react";

const owner = useOwner({
  name: "ens.eth",
  query: { staleTime: 30_000 },
});

const setText = useSetText();
await setText.mutateAsync({
  name: "ens.eth",
  key: "url",
  value: "https://ens.domains",
});
```
