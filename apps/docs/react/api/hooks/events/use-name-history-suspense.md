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

::: code-group

```tsx [component.tsx]
import { useNameHistorySuspense } from "@ensforge/react";

function Component() {
  const result = useNameHistorySuspense({
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
import type { GetNameHistoryParameters, UseEnsSuspenseQueryParameters } from "@ensforge/react";
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

Controls caching, retries, polling, and data selection. Suspense queries always execute and do not accept `enabled`.

| Property               | Type                  | Default  | Description                                                      |
| ---------------------- | --------------------- | -------- | ---------------------------------------------------------------- |
| `gcTime`               | `number`              | `300000` | Milliseconds an unused result remains in the cache.              |
| `refetchInterval`      | `false \| number`     | `false`  | Polling interval in milliseconds, or `false` to disable polling. |
| `refetchOnWindowFocus` | `boolean`             | `false`  | Refetch stale data when the document regains focus.              |
| `retry`                | `false \| number`     | `false`  | Number of retries after a typed failure.                         |
| `select`               | `(value) => selected` | identity | Transforms cached action data into the hook's `data` type.       |
| `staleTime`            | `number`              | `30000`  | Milliseconds successful data remains fresh.                      |

See [Query Options](/react/api/query-options) for focused examples.

## Return Type

```ts
type Result = ReturnType<typeof useNameHistorySuspense>;
```

Returns `EnsSuspenseQueryResult` with successful `data`, background `isFetching` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

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
