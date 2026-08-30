---
title: Caching and Invalidation
description: Share, prefetch, refresh, and invalidate ENS Effect Atom state.
---

# Caching and Invalidation

Atom identity includes the SDK instance, action group, action name, and normalized parameters.
Mounted components requesting the same key share execution and cached state.

## Freshness and retention

`atom.swr.staleTime` controls when successful data should be revalidated. `atom.idleTTL` controls
how long an inactive atom remains reusable. Both accept Effect `Duration.Input` values.

## Invalidate from React

```tsx
import { useInvalidate } from "@ensforge/react";

const invalidate = useInvalidate();

await invalidate({ name: "example.eth" });
```

Pass no parameters, or `{ all: true }`, to invalidate every ensforge atom in the active registry.
Use the Effect counterpart when invalidation belongs to a larger program.

```tsx
const effect = invalidate.effect({ name: "example.eth" });
```

## Prefetch

```ts [prefetch.ts]
import { getOwnerAtom } from "@ensforge/react/atoms";
import { prefetch } from "@ensforge/react/cache";

await prefetch(registry, sdk, getOwnerAtom, { name: "example.eth" });
```

`prefetchEffect` performs the same work without leaving Effect.

## Own the registry

Use `createRegistry` for tests, request-scoped server work, or application-level prefetching,
then pass the registry to `EnsforgeProvider`. Never share a mutable per-user registry between SSR
requests.
