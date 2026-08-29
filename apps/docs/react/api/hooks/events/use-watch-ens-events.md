---
title: useWatchEnsEvents
description: Hook for watching ens events.
---

# useWatchEnsEvents

Hook for watching ens events.

## Import

```tsx
import { useWatchEnsEvents } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useWatchEnsEvents({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useWatchEnsEvents>[0];
```

### account

`EthereumAddress | undefined`

Account used for authorization and execution.

### name

`string | undefined`

ENS name used by the query or mutation.

### commitment

`Bytes32 | undefined`

Registration commitment.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Value used for `kinds` by this operation.

### fromBlock

`bigint | undefined`

First block included in an event query.

### pollingInterval

`number | undefined`

Polling interval in milliseconds.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useWatchEnsEvents>;
```

## Effect Atom

```ts
import { watchEnsEventsAtom } from "@ensforge/react/atoms";

const atom = watchEnsEventsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`watchEnsEvents`](/core/api/actions/events/watch-ens-events)
- [`sdk.events.watchEnsEvents`](/sdk/api/events/watch-ens-events)
