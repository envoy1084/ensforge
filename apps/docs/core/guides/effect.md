---
title: Effect Guide
description: Compose, retry, interrupt, and observe Ensforge actions with Effect.
---

# Effect

Ensforge actions are Effects at their execution boundary. This keeps failures typed and makes
concurrency, timeouts, retries, and cancellation explicit.

## Build one program

Prefer composing the complete operation before calling a runtime.

```ts
import { Effect } from "effect";
import { getNameState, getRecords } from "@ensforge/core";

const program = Effect.gen(function* () {
  const state = yield* getNameState.effect(config, { name: "ens.eth" });
  if (state.kind === "available") return { state, records: null };

  const records = yield* getRecords.effect(config, {
    name: state.name,
    records: {
      address: { type: "address", coinType: 60n },
      avatar: { type: "avatar" },
      url: { type: "text", key: "url" },
    },
  });
  return { state, records };
});

const result = await Effect.runPromise(program);
```

## Retry transient failures

Retries should target failures that can succeed later. Avoid retrying invalid names, unsupported
operations, or rejected wallet requests.

```ts
import { Effect, Schedule } from "effect";

const owner = getOwner.effect(config, { name: "ens.eth" }).pipe(
  Effect.retry({
    schedule: Schedule.exponential("100 millis").pipe(Schedule.compose(Schedule.recurs(2))),
    while: (error) => error._tag === "RpcError",
  }),
);
```

## Add a timeout

```ts
const owner = getOwner.effect(config, { name: "ens.eth" }).pipe(Effect.timeout("5 seconds"));
```

## Interrupt work

Running with an `AbortSignal` interrupts the Effect and any supported RPC request beneath it.

```ts
const controller = new AbortController();

const promise = Effect.runPromise(program, {
  signal: controller.signal,
});

controller.abort();
```

## Preserve spans

Core actions add named spans and ENS attributes to their internal effects. Install your preferred
Effect tracer at the application boundary to export them; no separate Ensforge tracing API is
required.
