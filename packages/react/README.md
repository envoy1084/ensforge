# `@ensforge/react`

Effect Atom-powered React hooks for Ensforge.

## Installation

```sh
pnpm add @ensforge/react effect react scheduler viem wagmi
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

An existing SDK can be supplied instead:

```tsx
<EnsforgeProvider sdk={sdk}>
  <App />
</EnsforgeProvider>
```

The provider treats `config`, `sdk`, and defaults as initialization values. Remount it with a new
React `key` when switching the configured ENS network.

## Queries and mutations

```tsx
import { useOwner, useSetText } from "@ensforge/react";

const owner = useOwner({
  name: "ens.eth",
  query: { staleTime: 30_000 },
});

const setText = useSetText();
setText.mutate({
  name: "ens.eth",
  key: "url",
  value: "https://ens.domains",
});
```

Every query exposes its native Effect Atom `AsyncResult`. Mutations can be run with `mutate`,
`mutateAsync`, or `mutateEffect`.
