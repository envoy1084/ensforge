---
title: Mutation Hooks
description: Execute ENS writes and workflows from React.
---

# Mutation Hooks

Mutation hooks do not execute until you call a mutation function.

```tsx
const setText = useSetText({
  onSuccess: () => console.log("Updated"),
});

setText.mutate({ name, key: "url", value });
```

`mutate` starts work without returning the result. `mutateAsync` returns a Promise. `mutateEffect`
returns the typed Effect.

```tsx
const result = await setText.mutateAsync(parameters);
const effect = setText.mutateEffect(parameters);
```

Use `isIdle`, `isPending`, `isSuccess`, and `isError` to render state. `interrupt` cancels the active
Effect, and `reset` restores the atom to its initial state.

After a write, invalidate the affected cache entries with `useInvalidateEnsforge` when the hook does
not already model the complete workflow result.
