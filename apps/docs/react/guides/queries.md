---
title: Query Hooks
description: Fetch and cache ENS reads with React query hooks.
---

# Query Hooks

Query hooks start from action parameters and return a typed `EnsQueryResult`.

```tsx
const owner = useOwner({
  name: "ens.eth",
  query: { staleTime: 60_000 },
});
```

## Query options

`enabled` disables execution. `staleTime` controls freshness, `gcTime` controls inactive retention,
`retry` retries failed Effects, `refetchInterval` enables polling, and `select` derives a typed value.

```tsx
const address = useAddress({
  name,
  query: {
    enabled: name.length > 0,
    select: (record) => record.address,
  },
});
```

## Result

Use `isPending`, `isLoading`, `isFetching`, `isSuccess`, and `isError` to render state. `data`,
`error`, and `cause` preserve the selected success and typed Effect failure.

Call `refetch()` for a Promise or `refetchEffect()` for an Effect.
