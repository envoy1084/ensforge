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

::: code-group

```tsx [component.tsx]
import { useNameHistory } from "@ensforge/react";

function Component() {
  const result = useNameHistory({
    name: "example.eth",
    fromBlock: 22_000_000n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetNameHistoryParameters, UseEnsQueryParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### fromBlock

`bigint`

First block included in an event query.

### toBlock

`bigint | undefined`

Last block included in an event query.

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
type Result = ReturnType<typeof useNameHistory>;
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
import { getNameHistoryAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getNameHistoryAtom(ens, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getNameHistory`](/core/api/actions/events/get-name-history)
- [`sdk.events.getNameHistory`](/sdk/api/events/get-name-history)
