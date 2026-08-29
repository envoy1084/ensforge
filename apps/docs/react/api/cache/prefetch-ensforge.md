---
title: prefetchEnsforge
description: Prefetch an ensforge query atom into a registry.
---

# prefetchEnsforge

Executes a query atom and stores its result in an Effect Atom registry.

## Import

```ts
import { prefetchEnsforge } from "@ensforge/react/cache";
import { getOwnerAtom } from "@ensforge/react/atoms";
```

## Usage

```ts
const owner = await prefetchEnsforge(
  registry,
  sdk,
  getOwnerAtom,
  { name: "sdk.eth" },
  { gcTime: 300_000, refetchOnWindowFocus: false, retry: false },
);
```

## Parameters

Accepts the registry, SDK, query atom factory, action parameters, query atom options, and optional
Effect run options.

## Return Type

`Promise<Success>`

## Effect

Use [`prefetchEnsforgeEffect`](/react/api/cache/prefetch-ensforge-effect) to keep the operation in an
Effect program.
