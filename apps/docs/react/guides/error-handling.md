---
title: Error Handling
description: Render and recover from typed ENS failures in React.
---

# Error Handling

Query and mutation results expose both a squashed `error` and the original Effect `cause`.

```tsx
const owner = useOwner({ name });

if (owner.isError) {
  return <p>{owner.error.message}</p>;
}
```

Use `cause` when the interface needs to distinguish typed failures or inspect interruption. Use the
plain `error` for ordinary error-boundary and message integrations.

Mutation callbacks receive the typed failure or a standard `Error`:

```tsx
const setText = useSetText({
  onError(error) {
    if (error instanceof WalletError && error.code === "USER_REJECTED") return;
    reportError(error);
  },
});
```

Do not automatically retry wallet rejection, invalid names, or authorization errors. Query `retry`
is most useful for transient RPC and gateway failures.
