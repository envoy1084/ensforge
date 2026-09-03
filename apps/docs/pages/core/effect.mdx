---
title: Effect
description: Use the Effect interface exposed by every ensforge Core action.
---

# Effect

Every Core action exposes an `.effect` property. This is the primary implementation; the callable
Promise API runs the same Effect with `Effect.runPromise`.

```ts
import { getOwner } from "@ensforge/core";

const program = getOwner.effect(config, { name: "ens.eth" });
```

The Effect type records the success value and every expected failure:

```ts
Effect.Effect<OwnerResult | null, GetOwnerError>;
```

No environment is required because `createConfig` already contains the clients and services used by
an action.

## Run an Effect

```ts
import { Effect } from "effect";

const owner = await Effect.runPromise(getOwner.effect(config, { name: "ens.eth" }));
```

## Compose actions

Use ordinary Effect operators without converting through promises.

```ts
import { Effect } from "effect";
import { getOwner, getResolver } from "@ensforge/core";

const profile = Effect.gen(function* () {
  const owner = yield* getOwner.effect(config, { name: "ens.eth" });
  const resolver = yield* getResolver.effect(config, { name: "ens.eth" });
  return { owner, resolver };
});
```

## Execute concurrently

```ts
const profile = Effect.all(
  {
    owner: getOwner.effect(config, { name: "ens.eth" }),
    resolver: getResolver.effect(config, { name: "ens.eth" }),
  },
  { concurrency: "unbounded" },
);
```

This runs independent effects concurrently. Use [`readBatch`](/core/guides/batching) when you also
want compatible contract reads aggregated through Multicall.

## Handle typed failures

```ts
const owner = getOwner
  .effect(config, { name: input })
  .pipe(
    Effect.catchTag("NameError", (error) => Effect.logWarning(error.message).pipe(Effect.as(null))),
  );
```

See [Effect guide](/core/guides/effect) for retries, interruption, timeouts, and tracing.
