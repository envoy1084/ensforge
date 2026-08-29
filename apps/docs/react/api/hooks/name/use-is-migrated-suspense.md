---
title: useIsMigratedSuspense
description: Suspense hook for checking whether the name is migrated.
---

# useIsMigratedSuspense

Suspense hook for checking whether the name is migrated.

## Import

```tsx
import { useIsMigratedSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsMigratedSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsMigratedSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useIsMigratedSuspense>;
```

## Effect Atom

```ts
import { isMigratedAtom } from "@ensforge/react/atoms";

const atom = isMigratedAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isMigrated`](/core/api/actions/name/is-migrated)
- [`sdk.name.isMigrated`](/sdk/api/name/is-migrated)
