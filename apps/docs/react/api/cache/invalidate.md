---
title: invalidate
description: Refresh matching ensforge atoms in an Effect Atom registry.
---

# invalidate

Refreshes atoms matched by name, address, action group, or network-wide selection.

## Import

```ts
import { invalidate } from "@ensforge/react/cache";
```

## Usage

```ts
await invalidate(registry, sdk, {
  group: "records",
  name: "example.eth",
});
```

## Parameters

`Invalidation` supports `all`, `group`, `name`, `names`, and `address`. An omitted or empty selector
invalidates every ensforge atom for the SDK network.

## Return Type

`Promise<void>`

## Effect

Use [`invalidateEffect`](./invalidate-effect) to keep invalidation inside an Effect program.
