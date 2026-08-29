---
title: Query Options
description: Configure ensforge React query execution, caching, retries, and selection.
---

# Query Options

Every standard query hook accepts a `query` property. Provider defaults are applied first and
per-hook options override them.

```ts
import type { EnsQueryOptions, UseEnsQueryParameters } from "@ensforge/react";
```

## enabled

`boolean | undefined`

Defaults to `true`. Set it to `false` to create the hook without executing its query.

```tsx
const owner = useOwner({ name, query: { enabled: name.endsWith(".eth") } });
```

Suspense hooks always execute and do not accept this option.

## gcTime

`number | undefined`

Defaults to `300000` (five minutes). Controls how long an inactive cached query remains reusable.
Set it to `Infinity` to retain inactive values for the lifetime of the registry.

## refetchInterval

`false | number | undefined`

Defaults to `false`. Pass a millisecond interval to poll while the hook is mounted.

```tsx
const expiry = useExpiry({ name: "example.eth", query: { refetchInterval: 30_000 } });
```

## refetchOnWindowFocus

`boolean | undefined`

Defaults to `false`. When enabled, a stale query refreshes after the document regains focus.

## retry

`false | number | undefined`

Defaults to `false`. A number specifies how many times the Effect should retry after a typed
failure. Retries use the same query key and parameters.

## select

`(value: Success) => Selected`

Transforms successful action data before it is exposed as `data`. TypeScript infers the selected
return type.

```tsx
const owner = useOwner({
  name: "example.eth",
  query: { select: (result) => result?.owner ?? null },
});

owner.data; // Address | null | undefined
```

Selection does not change the cached action result; components can select different projections
from the same query.

## staleTime

`number | undefined`

Defaults to `30000`. A successful value younger than `staleTime` is served without a mount-time
refetch. Pass `0` to treat every value as stale or `Infinity` to disable age-based refetching.

## Provider defaults

```tsx
<EnsforgeProvider
  config={config}
  defaults={{ queries: { gcTime: 10 * 60_000, retry: 2, staleTime: 60_000 } }}
>
  <App />
</EnsforgeProvider>
```

`enabled` and `select` are intentionally per-hook and cannot be set as provider defaults.
