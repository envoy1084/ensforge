---
title: Error Handling
description: Render and recover from typed ENS failures in React.
---

# Error Handling

Query and mutation results expose both a squashed `error` and the original Effect `cause`.

```tsx
const owner = useOwner({ name });

if (owner.isFailure) {
  return <p>{owner.error.message}</p>;
}
```

Use `cause` when the interface needs to distinguish typed failures or inspect interruption. Use the
plain `error` for ordinary error-boundary and message integrations.

Mutation callbacks receive the complete Effect `Exit`:

```tsx
import { Exit } from "effect";

const setText = useSetText({
  onExit(exit) {
    Exit.match(exit, {
      onFailure: reportCause,
      onSuccess: () => undefined,
    });
  },
});
```

Do not automatically retry wallet rejection, invalid names, or authorization errors. Atom `retry`
schedules are most useful for transient RPC and gateway failures.
