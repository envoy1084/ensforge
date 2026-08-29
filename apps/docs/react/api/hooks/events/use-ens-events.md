---
title: useEnsEvents
description: Hook for fetching ens events.
---

# useEnsEvents

Hook for fetching ens events.

## Import

```tsx
import { useEnsEvents } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useEnsEvents({
    fromBlock: 22_000_000n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useEnsEvents>[0];
```

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

### kinds

`ReadonlyArray<EnsEventKind> | undefined`

Value used for `kinds` by this operation.

### name

`string | undefined`

ENS name used by the query or mutation.

### account

`EthereumAddress | undefined`

Account used for authorization and execution.

### commitment

`Bytes32 | undefined`

Registration commitment.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useEnsEvents>;
```

## Effect Atom

```ts
import { getEnsEventsAtom } from "@ensforge/react/atoms";

const atom = getEnsEventsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getEnsEvents`](/core/api/actions/events/get-ens-events)
- [`sdk.events.getEnsEvents`](/sdk/api/events/get-ens-events)
