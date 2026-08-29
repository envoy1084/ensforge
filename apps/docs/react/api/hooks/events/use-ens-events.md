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

::: code-group

```tsx [component.tsx]
import { useEnsEvents } from "@ensforge/react";

function Component() {
  const result = useEnsEvents({
    fromBlock: 22_000_000n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetEnsEventsParameters, UseEnsQueryParameters } from "@ensforge/react";
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

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### account

`EthereumAddress | undefined`

Account used to authorize the mutation. Defaults to the active wallet account.

### commitment

`Bytes32 | undefined`

Registration commitment.

### query

`EnsQueryOptions | undefined`

Controls execution, caching, retries, polling, and data selection for this hook.

| Property               | Type                  | Default  | Description                                                      |
| ---------------------- | --------------------- | -------- | ---------------------------------------------------------------- |
| `enabled`              | `boolean`             | `true`   | Set to `false` to keep the query idle.                           |
| `gcTime`               | `number`              | `300000` | Milliseconds an unused result remains in the cache.              |
| `refetchInterval`      | `false \| number`     | `false`  | Polling interval in milliseconds, or `false` to disable polling. |
| `refetchOnWindowFocus` | `boolean`             | `false`  | Refetch stale data when the document regains focus.              |
| `retry`                | `false \| number`     | `false`  | Number of retries after a typed failure.                         |
| `select`               | `(value) => selected` | identity | Transforms cached action data into the hook's `data` type.       |
| `staleTime`            | `number`              | `30000`  | Milliseconds successful data remains fresh.                      |

See [Query Options](/react/api/query-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useEnsEvents>;
```

Returns an [`EnsQueryResult`](/react/api/query-result).

| Property        | Description                                             |
| --------------- | ------------------------------------------------------- |
| `data`          | Successful action data, or `undefined` before success.  |
| `error`         | Typed action failure, an unexpected `Error`, or `null`. |
| `status`        | `"pending"`, `"success"`, or `"error"`.                 |
| `fetchStatus`   | `"fetching"` while work is active; otherwise `"idle"`.  |
| `isLoading`     | `true` only for the first pending fetch.                |
| `isFetching`    | `true` for initial and background fetches.              |
| `isRefetching`  | `true` for a background fetch after the initial state.  |
| `refetch`       | Refetches and returns a Promise.                        |
| `refetchEffect` | Refetches with a typed Effect error channel.            |
| `result`        | Underlying Effect `AsyncResult`.                        |
| `updatedAt`     | Timestamp of the latest successful value.               |

## Effect Atom

```ts
import { getEnsEventsAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getEnsEventsAtom(ens, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getEnsEvents`](/core/api/actions/events/get-ens-events)
- [`sdk.events.getEnsEvents`](/sdk/api/events/get-ens-events)
