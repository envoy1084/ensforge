---
title: useInvalidateEnsforge
description: Hook for invalidating cached ensforge queries.
---

# useInvalidateEnsforge

Hook for invalidating cached ensforge queries.

## Import

```tsx
import { useInvalidateEnsforge } from "@ensforge/react";
```

## Usage

```tsx
function Editor() {
  const invalidate = useInvalidateEnsforge();

  const refresh = () => invalidate({ name: "example.eth" });
}
```

## Parameters

The hook accepts no parameters. The returned function accepts an optional `EnsforgeInvalidation` selector and optional Effect run options.

```ts
await invalidate({ group: "records", name: "example.eth" });
await invalidate({ all: true });
```

## Return Type

`InvalidateEnsforge`

The returned function resolves when matching atoms have been refreshed. `invalidate.effect(selector)` exposes the Effect form.

## Effect Atom

Invalidation operates directly on the registry from `EnsforgeProvider`; it does not create a query atom.
