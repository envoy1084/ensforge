---
title: Mutation Hooks
description: Execute ENS writes and workflows with callbacks, Promises, or Effect.
---

# Mutation Hooks

Mutation hooks stay idle until execution and preserve the Core action's success and error types.

```tsx
const setText = useSetText({
  onSuccess: (_result, parameters) => console.log(parameters.key),
});
```

## Callback execution

Use `mutate` when state and callbacks drive the UI.

```tsx
setText.mutate({ name, key: "url", value }, { onError: (error) => console.error(error.code) });
```

## Promise execution

Use `mutateAsync` when the caller owns asynchronous control flow.

```tsx
try {
  const result = await setText.mutateAsync({ name, key: "url", value });
  console.log(result.hash);
} catch (error) {
  // Handle the same typed error as the Core action.
}
```

## Effect execution

Use `mutateEffect` for typed recovery, tracing, timeouts, or larger workflows.

```tsx
import { Effect } from "effect";

const update = setText
  .mutateEffect({ name, key: "url", value })
  .pipe(Effect.tap(() => Effect.log("record updated")));
```

After a write, invalidate affected read keys with `useInvalidateEnsforge` when the workflow result
does not already contain the final state.
