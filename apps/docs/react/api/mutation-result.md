---
title: Mutation Result
description: Understand mutation execution, status, errors, and Effect controls.
---

# Mutation Result

Mutation hooks return `EnsMutationResult<Parameters, Success, Failure>`.

```ts
import type { EnsMutationResult, EnsMutationStatus } from "@ensforge/react";
```

## mutate

`(parameters, callbacks?) => void`

Starts the mutation and reports its result through hook-level and per-call callbacks.

## mutateAsync

`(parameters) => Promise<Success>`

Starts the mutation and returns a Promise. It rejects with the same typed action failure exposed by
the hook.

## mutateEffect

`(parameters) => Effect<Success, Failure>`

Starts the mutation as an Effect for composing retries, timeouts, logging, or other workflows.

```tsx
import { Effect } from "effect";

const program = setText
  .mutateEffect(parameters)
  .pipe(Effect.tap(() => Effect.log("ENS record updated")));
```

## status

`"idle" | "pending" | "success" | "error"`

The current state. Matching `isIdle`, `isPending`, `isSuccess`, and `isError` flags are provided.

## data

`Success | undefined`

The latest successful result.

## error

`Failure | Error | null`

The latest typed action failure or unexpected `Error`.

## cause

`Cause<Failure> | null`

The complete Effect cause for the latest failure.

## parameters

`Parameters | undefined`

The parameters used by the latest execution.

## interrupt

`() => void`

Interrupts the active Effect. An already-submitted transaction cannot be stopped; interruption
still cancels local waiting and follow-up work.

## reset

`() => void`

Restores the mutation atom to its idle state and clears the latest parameters, data, and error.

## result

`AsyncResult<Success, Failure>`

The underlying Effect `AsyncResult` for advanced Atom composition.
