---
title: makeQueryHook
description: Create a React query hook from an Ensforge query atom factory.
---

# makeQueryHook

Creates a hook with Ensforge query options and `EnsQueryResult` state from a query atom factory.

## Import

```ts
import { makeQueryHook } from "@ensforge/react";
```

## Usage

```ts
export const useProfile = makeQueryHook(getProfileAtom);
```

## Return Type

A hook accepting action parameters plus `query` options.
