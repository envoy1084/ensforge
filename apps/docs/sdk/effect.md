---
title: Effect
description: Compose config-bound SDK methods as Effect programs.
---

# Effect

Every SDK method exposes the Core Effect implementation with configuration already bound.

```ts
import { Effect } from "effect";

const program = Effect.gen(function* () {
  const owner = yield* sdk.name.getOwner.effect({ name: "ens.eth" });
  const avatar = yield* sdk.records.getAvatar.effect({ name: "ens.eth" });
  return { owner, avatar };
});

const profile = await Effect.runPromise(program);
```

The ordinary method runs the same Effect as a Promise. Choose either interface at the call site
without maintaining separate clients or implementations.
