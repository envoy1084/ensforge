---
title: invalidateEnsforge
description: Invalidate matching Ensforge queries in an Effect Atom registry.
---

# invalidateEnsforge

Refreshes cached queries matched by a name, address, group, or all-cache selector.

## Import

```ts
import { invalidateEnsforge } from "@ensforge/react/cache";
```

## Usage

```ts
await invalidateEnsforge(registry, sdk, {
  group: "records",
  name: "example.eth",
});
```

## Parameters

`EnsforgeInvalidation` supports `all`, `group`, `name`, `names`, and `address`. An empty selector
invalidates every Ensforge query for the SDK network.

## Return Type

`Promise<void>`

## Effect

Use [`invalidateEnsforgeEffect`](/react/api/cache/invalidate-ensforge-effect) for Effect composition.
