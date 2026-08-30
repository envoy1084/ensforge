---
title: useInvalidate
description: Hook for refreshing cached ensforge atoms.
---

# useInvalidate

Returns the registry-bound invalidation function for the nearest `EnsforgeProvider`.

## Import

```tsx
import { useInvalidate } from "@ensforge/react";
```

## Usage

```tsx
function Editor() {
  const invalidate = useInvalidate();

  const refreshRecords = () => invalidate({ group: "records", name: "example.eth" });
}
```

## Parameters

The hook accepts no parameters. Its returned function accepts an optional `Invalidation` selector
and optional Effect run options.

```ts
await invalidate({ name: "example.eth" });
await invalidate({ all: true });
```

## Return Type

`Invalidate`

The function resolves when matching atoms have refreshed. `invalidate.effect(selector)` exposes the
typed Effect form.
