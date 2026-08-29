---
title: useCommitmentStatus
description: Hook for fetching commitment status.
---

# useCommitmentStatus

Hook for fetching commitment status.

## Import

```tsx
import { useCommitmentStatus } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCommitmentStatus } from "@ensforge/react";

function Component() {
  const result = useCommitmentStatus({
    commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetCommitmentStatusParameters, UseEnsQueryParameters } from "@ensforge/react";
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
type Result = ReturnType<typeof useCommitmentStatus>;
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
import { getCommitmentStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getCommitmentStatusAtom(ens, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getCommitmentStatus`](/core/api/actions/registration/get-commitment-status)
- [`sdk.registration.getCommitmentStatus`](/sdk/api/registration/get-commitment-status)
