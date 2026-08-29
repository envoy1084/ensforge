---
title: Caching and Invalidation
description: Share, prefetch, refresh, and invalidate Effect Atom query state.
---

# Caching and Invalidation

Query identity includes the SDK instance, action group, action name, and normalized parameters.
Mounted components requesting the same key share execution and cached state.

## Freshness and retention

`staleTime` controls when successful data should be refreshed. `gcTime` controls how long an
inactive query remains reusable. The registry's `defaultIdleTTL` controls atom lifetime separately.

## Invalidate from React

```tsx
import { useInvalidateEnsforge } from "@ensforge/react";

const invalidate = useInvalidateEnsforge();

await invalidate({ name: "example.eth" });
```

Pass no parameters, or `{ all: true }`, to invalidate every ensforge query in the active registry.
Use the Effect counterpart when invalidation belongs to a larger program.

```tsx
const effect = invalidate.effect({ name: "example.eth" });
```

## Prefetch

```ts [prefetch.ts]
import { getOwnerAtom, prefetchEnsforge } from "@ensforge/react";

await prefetchEnsforge(registry, ens, getOwnerAtom, { name: "example.eth" });
```

`prefetchEnsforgeEffect` performs the same work without leaving Effect.

## Own the registry

Use `createEnsforgeRegistry` for tests, request-scoped server work, or application-level prefetching,
then pass the registry to `EnsforgeProvider`. Never share a mutable per-user registry between SSR
requests.
