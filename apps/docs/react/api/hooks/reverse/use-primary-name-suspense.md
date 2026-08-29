---
title: usePrimaryNameSuspense
description: Suspense hook for fetching primary name.
---

# usePrimaryNameSuspense

Suspense hook for fetching primary name.

## Import

```tsx
import { usePrimaryNameSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { usePrimaryNameSuspense } from "@ensforge/react";

function Component() {
  const result = usePrimaryNameSuspense({
    address: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetPrimaryNameParameters, UseEnsSuspenseQueryParameters } from "@ensforge/react";
```

### address

`string`

Address used by the operation.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

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
type Result = ReturnType<typeof usePrimaryNameSuspense>;
```

Returns `EnsSuspenseQueryResult` with successful `data`, background `isFetching` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

## Effect Atom

```ts
import { getPrimaryNameAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getPrimaryNameAtom(ens, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getPrimaryName`](/core/api/actions/reverse/get-primary-name)
- [`sdk.reverse.getPrimaryName`](/sdk/api/reverse/get-primary-name)
