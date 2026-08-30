---
title: Mutation Result
description: Understand mutation execution and Effect AsyncResult state in ensforge React.
---

# Mutation Result

Mutation hooks return `EnsMutationResult<Parameters, Success, Failure>`.

```ts
import type { EnsMutationResult } from "@ensforge/react";
```

## mutate

`(parameters, options?) => void`

Starts the mutation without returning a Promise. Use hook-level or per-call `onExit` when the caller
needs the complete execution outcome.

## mutateAsync

`(parameters) => Promise<Success>`

Starts the mutation and returns a Promise. It rejects when the Effect fails.

## mutateEffect

`(parameters) => Effect<Success, Failure>`

Returns the typed Effect for composition with schedules, timeouts, logging, tracing, and recovery.

```tsx
import { Effect } from "effect";

const program = setText
  .mutateEffect(parameters)
  .pipe(Effect.tap(() => Effect.log("ENS record updated")));
```

## result

`AsyncResult<Success, Failure>`

The native Effect Atom result for the latest execution.

## State

| Property    | Meaning                                                  |
| ----------- | -------------------------------------------------------- |
| `isInitial` | No mutation has executed since creation or reset.        |
| `isWaiting` | The mutation Effect is currently running.                |
| `isSuccess` | The latest execution succeeded and is no longer waiting. |
| `isFailure` | The latest execution failed.                             |

## data

`Success | undefined`

The latest successful result.

## cause

`Cause<Failure> | null`

The complete Effect cause for the latest failure.

## error

`Failure | Error | null`

The latest typed action failure or a squashed unexpected error.

## parameters

`Parameters | undefined`

The parameters used by the latest execution.

## interrupt

`() => void`

Interrupts the active Effect. An already-submitted transaction cannot be stopped, but local waiting
and follow-up work are interrupted.

## reset

`() => void`

Restores the mutation atom to its initial state and clears its latest parameters, value, and cause.
