---
title: useResolverVersion
description: Hook for fetching resolver version.
---

# useResolverVersion

Hook for fetching resolver version.

## Import

```tsx
import { useResolverVersion } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverVersion({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverVersion>[0];
```

### name

`string`

ENS name used by the query or mutation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useResolverVersion>;
```

## Effect Atom

```ts
import { getResolverVersionAtom } from "@ensforge/react/atoms";

const atom = getResolverVersionAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getResolverVersion`](/core/api/actions/resolution/get-resolver-version)
- [`sdk.resolution.getResolverVersion`](/sdk/api/resolution/get-resolver-version)
