---
title: useNameHistorySuspense
description: Suspense hook for fetching name history.
---

# useNameHistorySuspense

Suspense hook for fetching name history.

## Import

```tsx
import { useNameHistorySuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useNameHistorySuspense({
    name: "example.eth",
    fromBlock: 22_000_000n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useNameHistorySuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useNameHistorySuspense>;
```

## Effect Atom

```ts
import { getNameHistoryAtom } from "@ensforge/react/atoms";

const atom = getNameHistoryAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getNameHistory`](/core/api/actions/events/get-name-history)
- [`sdk.events.getNameHistory`](/sdk/api/events/get-name-history)
