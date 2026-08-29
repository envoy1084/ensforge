---
title: Query Result
description: Understand the data, status, errors, and Effect controls returned by query hooks.
---

# Query Result

Standard query hooks return `EnsQueryResult<Success, Failure>`.

```ts
import type { EnsFetchStatus, EnsQueryResult, EnsQueryStatus } from "@ensforge/react";
```

## data

`Success | undefined`

The latest selected success value. It remains available during a background refetch.

## error

`Failure | Error | null`

The latest typed failure. Defects and interrupted Effects are squashed to `Error` at the React
boundary. Use `cause` when you need the complete Effect cause tree.

## cause

`Cause<Failure> | null`

The complete Effect cause for the latest failure, including typed errors, defects, and interruption.

## status

`"pending" | "success" | "error"`

Describes the resolved query state. Matching `isPending`, `isSuccess`, and `isError` booleans are
available for JSX branches.

## fetchStatus

`"idle" | "fetching"`

Describes whether work is currently running, independently from `status`.

## Loading states

| Property       | Meaning                                                |
| -------------- | ------------------------------------------------------ |
| `isLoading`    | First fetch is running and no settled value exists.    |
| `isFetching`   | Any initial or background fetch is running.            |
| `isRefetching` | A background fetch is running after the initial state. |

## refetch

`() => Promise<Success>`

Refreshes the query and resolves with its selected successful value.

```tsx
const owner = useOwner({ name: "example.eth" });
const latest = await owner.refetch();
```

## refetchEffect

`() => Effect<Success, Failure>`

Refreshes the query without leaving Effect. Cancellation and the typed failure channel are retained.

```tsx
import { Effect } from "effect";

const program = owner.refetchEffect().pipe(Effect.retry({ times: 2 }));
```

## result

`AsyncResult<Success, Failure>`

The underlying Effect `AsyncResult`. Use it for Effect Atom composition; ordinary components can
usually use `data`, `error`, and the status fields.

## updatedAt

`number | undefined`

Timestamp of the latest successful value. Failed background refetches retain the previous success
timestamp.
