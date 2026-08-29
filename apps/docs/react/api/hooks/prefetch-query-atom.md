---
title: prefetchQueryAtom
description: Execute an existing query atom through a registry.
---

# prefetchQueryAtom

Executes an already-created query atom and resolves with its successful value.

## Import

```ts
import { prefetchQueryAtom } from "@ensforge/react";
```

## Usage

```ts
const value = await prefetchQueryAtom(registry, atom, signal);
```

## Parameters

Accepts an Effect Atom registry, query atom, and optional `AbortSignal`.

## Return Type

`Promise<Success>`

Use `prefetchEnsforge` when you have an atom factory and action parameters rather than an existing
atom instance.
