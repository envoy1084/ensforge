---
title: Caching and Invalidation
description: Control Effect Atom caching, prefetching, and invalidation.
---

# Caching and Invalidation

Ensforge creates stable query atoms from the SDK instance, action group, action name, and parameters.
Components requesting the same key share work and cached state.

## Invalidate from React

```tsx
const invalidate = useInvalidateEnsforge();

await invalidate({ name: "example.eth" });
```

Call `invalidate()` without parameters, or with `{ all: true }`, to refresh every Ensforge query in
the current registry.

## Prefetch outside components

```ts
await prefetchEnsforge(registry, sdk, getOwnerAtom, {
  name: "ens.eth",
});
```

Use `prefetchEnsforgeEffect` when composing with Effect.

## Custom registry

`createEnsforgeRegistry` creates a registry for SSR, tests, prefetching, or an application-owned
cache. Pass it to `EnsforgeProvider` through `registry`.

`defaultIdleTTL` controls how long unused atoms remain mounted. Query `gcTime` controls how long their
cached entries remain reusable.
