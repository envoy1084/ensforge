---
title: Query Hooks
description: Fetch, select, and refresh cached ENS reads with React query hooks.
---

# Query Hooks

Query hooks combine action parameters with an optional `query` object and return a typed
`EnsQueryResult`.

```tsx
const owner = useOwner({ name: "example.eth", query: { staleTime: 60_000 } });
```

## Dependent queries

Use `enabled` when a query depends on another result.

```tsx
const resolver = useResolver({ name });
const capabilities = useResolverCapabilities({
  resolver: resolver.data?.address!,
  query: { enabled: resolver.data?.address !== null && resolver.data !== undefined },
});
```

## Select data

`select` changes the hook's data type without duplicating the cached RPC result.

```tsx
const owner = useOwner({
  name,
  query: { select: (result) => result?.owner ?? null },
});
```

## Background state

`isLoading` is only true during the first fetch. Use `isFetching` for any active fetch and
`isRefetching` for background work when existing data can remain visible.

## Manual refresh

```tsx
const latest = await owner.refetch();
const effect = owner.refetchEffect();
```

The Promise and Effect controls refresh the same cache entry. See [Query Result](/react/api/query-result).
