---
title: prefetchEnsforgeEffect
description: Prefetch an ensforge query atom as an Effect.
---

# prefetchEnsforgeEffect

Returns the Effect that executes and caches a query atom.

## Import

```ts
import { prefetchEnsforgeEffect } from "@ensforge/react/cache";
```

## Usage

```ts
const effect = prefetchEnsforgeEffect(
  registry,
  sdk,
  getOwnerAtom,
  { name: "ens.eth" },
  { gcTime: 300_000, refetchOnWindowFocus: false, retry: false },
);
```

## Return Type

`Effect.Effect<Success, Failure>`
