---
title: makeSuspenseQueryHook
description: Create a Suspense query hook from an ensforge query atom factory.
---

# makeSuspenseQueryHook

Creates a hook that suspends while its query atom is pending and throws failures to the nearest error
boundary.

## Import

```ts
import { makeSuspenseQueryHook } from "@ensforge/react";
```

## Usage

```ts
export const useProfileSuspense = makeSuspenseQueryHook(getProfileAtom);
```

## Return Type

`EnsSuspenseQueryResult<Selected>`
