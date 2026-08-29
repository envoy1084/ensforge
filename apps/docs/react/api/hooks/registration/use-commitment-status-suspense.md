---
title: useCommitmentStatusSuspense
description: Suspense hook for fetching commitment status.
---

# useCommitmentStatusSuspense

Suspense hook for fetching commitment status.

## Import

```tsx
import { useCommitmentStatusSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCommitmentStatusSuspense } from "@ensforge/react";

function Component() {
  const result = useCommitmentStatusSuspense({
    commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetCommitmentStatusParameters, UseEnsSuspenseQueryParameters } from "@ensforge/react";
```

### commitment

`Bytes32`

Registration commitment.

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
type Result = ReturnType<typeof useCommitmentStatusSuspense>;
```

Returns `EnsSuspenseQueryResult` with successful `data`, background `isFetching` state, and `updatedAt`. Pending work suspends rendering and failures are thrown to the nearest error boundary.

## Effect Atom

```ts
import { getCommitmentStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getCommitmentStatusAtom(ens, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getCommitmentStatus`](/core/api/actions/registration/get-commitment-status)
- [`sdk.registration.getCommitmentStatus`](/sdk/api/registration/get-commitment-status)
