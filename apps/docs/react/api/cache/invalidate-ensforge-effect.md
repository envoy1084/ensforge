---
title: invalidateEnsforgeEffect
description: Invalidate matching Ensforge queries as an Effect.
---

# invalidateEnsforgeEffect

Returns the Effect that refreshes matching Ensforge query atoms.

## Import

```ts
import { invalidateEnsforgeEffect } from "@ensforge/react/cache";
```

## Usage

```ts
const effect = invalidateEnsforgeEffect(registry, sdk, {
  name: "example.eth",
});
```

## Return Type

`Effect.Effect<void>`
