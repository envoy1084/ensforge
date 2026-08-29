---
title: makeInvalidationKeys
description: Build Effect reactivity keys for an Ensforge invalidation selector.
---

# makeInvalidationKeys

Converts a public invalidation selector into the network-scoped reactivity keys used by Ensforge
atoms.

## Import

```ts
import { makeInvalidationKeys } from "@ensforge/react/cache";
```

## Usage

```ts
const keys = makeInvalidationKeys(sdk, {
  names: ["alice.eth", "bob.eth"],
});
```

## Return Type

`EnsforgeReactivityKeys`

Most applications should call `invalidateEnsforge` or `useInvalidateEnsforge`. Use this function when
integrating Ensforge keys with another Effect reactivity operation.
