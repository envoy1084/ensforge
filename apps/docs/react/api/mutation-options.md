---
title: Mutation Options
description: Configure retries and lifecycle callbacks for ensforge mutation hooks.
---

# Mutation Options

Mutation hooks accept an optional `EnsMutationOptions` object.

```ts
import type { EnsMutationCallbacks, EnsMutationOptions } from "@ensforge/react";
```

## retry

`false | number | undefined`

Number of times to retry the Effect after failure. It defaults to `false`. Do not enable automatic
retries for writes unless the operation is known to be safe and idempotent.

## onSuccess

`(data: Success, parameters: Parameters) => void`

Runs after a successful mutation with the result and exact parameters passed to it.

```tsx
const setText = useSetText({
  onSuccess(data, parameters) {
    console.log(parameters.name, data.status);
  },
});
```

## onError

`(error: Failure | Error, parameters: Parameters) => void`

Runs after failure. Typed action failures are preserved; defects are exposed as `Error`.

## onSettled

`(data: Success | undefined, error: Failure | Error | null, parameters: Parameters) => void`

Runs after either outcome. Exactly one of `data` and `error` is present.

## Per-call callbacks

`mutate` accepts callbacks for one execution. Hook callbacks run first, followed by per-call
callbacks.

```tsx
setText.mutate(
  { name: "example.eth", key: "url", value: "https://example.com" },
  { onSuccess: (data) => console.log(data.hash) },
);
```

`mutateAsync` and `mutateEffect` report through their Promise or Effect result instead of accepting
per-call callbacks.
