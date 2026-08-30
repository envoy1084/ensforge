---
title: prefetchEffect
description: Evaluate and cache an ensforge atom as an Effect.
---

# prefetchEffect

Returns the Effect that evaluates an atom factory and stores its result in a registry.

## Import

```ts
import { prefetchEffect } from "@ensforge/react/cache";
```

## Usage

```ts
import { Schedule } from "effect";
import { getOwnerAtom } from "@ensforge/react/atoms";

const effect = prefetchEffect(
  registry,
  sdk,
  getOwnerAtom,
  { name: "example.eth" },
  {
    idleTTL: "5 minutes",
    retry: Schedule.recurs(2),
  },
);
```

## Return Type

`Effect.Effect<Success, Failure>`
