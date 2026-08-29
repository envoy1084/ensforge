---
title: useNameHistory
description: Hook for fetching name history.
---

# useNameHistory

Hook for fetching name history.

## Import

```tsx
import { useNameHistory } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useNameHistory({
    name: "example.eth",
    fromBlock: 22_000_000n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useNameHistory>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useNameHistory>;
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
