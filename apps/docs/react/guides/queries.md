---
title: Read Hooks
description: Fetch, map, and refresh ENS reads with Effect Atom React hooks.
---

# Read Hooks

Read hooks combine action parameters with optional Effect Atom behavior and return a typed
`EnsAtomResult`.

```tsx
const owner = useOwner({
  name: "example.eth",
  atom: { swr: { staleTime: "1 minute" } },
});
```

## Dependent queries

Use `enabled` when a read depends on another result.

```tsx
const resolver = useResolver({ name });
const capabilities = useResolverCapabilities({
  resolver: resolver.data?.address!,
  enabled: resolver.data?.address !== null && resolver.data !== undefined,
});
```

## Map data

`map` changes the hook's data type without duplicating the underlying atom or RPC result.

```tsx
const owner = useOwner({
  name,
  map: (result) => result.owner,
});
```

## Background state

`isInitial` identifies an atom without a settled result. `isWaiting` is true for initial and
background work while previous successful data can remain visible.

## Manual refresh

```tsx
const latest = await owner.refresh();
const effect = owner.refreshEffect();
```

The Promise and Effect controls refresh the same atom. See [Atom Result](/react/api/atom-result).
