# `@ensforge/react`

Reactive React hooks for building ENS applications.

## Features

- Queries and mutations for the full ensforge action surface
- Request caching, deduplication, retries, and stale-time controls
- Refetching and Suspense variants for read hooks
- Typed loading, success, and error states
- Provider setup from an ensforge config or existing SDK instance
- Shared cache primitives for prefetching and advanced composition

## Installation

```sh
pnpm add @ensforge/react react effect@rc viem
```

## Overview

Add `EnsforgeProvider` near the root of your application. It accepts the same viem or Wagmi
configuration as `Ensforge`:

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

Use query hooks anywhere below the provider:

```tsx
import { useAvatar, useOwner } from "@ensforge/react";

function Profile({ name }: { name: string }) {
  const owner = useOwner({ name });
  const avatar = useAvatar({
    name,
    query: { staleTime: 60_000 },
  });

  if (owner.isLoading || avatar.isLoading) return <span>Loading…</span>;
  if (owner.isError) return <span>{owner.error.message}</span>;

  return (
    <section>
      {avatar.data?.status === "resolved" && <img src={avatar.data.uri} alt="" />}
      <p>{owner.data?.owner}</p>
    </section>
  );
}
```

Write hooks expose mutation state and Promise-based execution:

```tsx
import { useSetText } from "@ensforge/react";

const setText = useSetText();

const updateUrl = () =>
  setText.mutate({
    name: "ens.eth",
    key: "url",
    value: "https://ens.domains",
  });
```

An existing SDK instance can also be shared through the provider:

```tsx
<EnsforgeProvider sdk={sdk}>
  <App />
</EnsforgeProvider>
```

## License

Apache-2.0
