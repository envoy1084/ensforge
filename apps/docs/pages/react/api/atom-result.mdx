---
title: Atom Result
description: Understand the Effect AsyncResult state and refresh controls returned by ensforge React read hooks.
---

# Atom Result

Standard read hooks return `EnsAtomResult<Success, Failure>`.

```ts
import type { EnsAtomResult } from "@ensforge/react";
```

## result

`AsyncResult<Success, Failure>`

The native Effect Atom result. Use `AsyncResult.match`, `AsyncResult.value`, or other Effect
combinators when you want to work directly with the state machine.

## data

`Success | undefined`

The latest mapped success value. Previous success data remains available while a background
refresh is waiting.

## cause

`Cause<Failure> | null`

The complete Effect cause for the latest failure, including typed errors, defects, and
interruptions.

## error

`Failure | Error | null`

The latest typed failure. Defects and interruptions are squashed to `Error` at the React boundary.
Use `cause` when you need the complete cause tree.

## State

| Property    | Meaning                                          |
| ----------- | ------------------------------------------------ |
| `isInitial` | No execution has completed yet.                  |
| `isWaiting` | Initial or background work is currently running. |
| `isSuccess` | The result contains a successful value.          |
| `isFailure` | The result contains a failed Effect cause.       |

These values are projections of `AsyncResult`; they do not maintain a separate query state
machine.

## refresh

`() => Promise<Success>`

Refreshes the atom and resolves with its mapped successful value.

```tsx
const owner = useOwner({ name: "example.eth" });
const latest = await owner.refresh();
```

## refreshEffect

`() => Effect<Success, Failure>`

Refreshes without leaving Effect. Interruption and the typed failure channel are preserved.

```tsx
import { Effect, Schedule } from "effect";

const program = owner.refreshEffect().pipe(Effect.retry(Schedule.recurs(2)));
```

## updatedAt

`number | undefined`

Timestamp of the latest successful value. A failed background refresh retains the previous
success timestamp.
