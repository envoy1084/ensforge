---
title: Effect
description: Compose ensforge React queries and mutations with Effect and Effect Atom.
---

# Effect

ensforge React exposes Effect at every asynchronous boundary instead of forcing Promise-only UI
control flow.

## Refetch a query

```tsx
import { Effect } from "effect";
import { useOwner } from "@ensforge/react";

const owner = useOwner({ name: "example.eth" });

const refresh = owner.refetchEffect().pipe(
  Effect.retry({ times: 2 }),
  Effect.tap((result) => Effect.log(`owner: ${result?.owner}`)),
);
```

## Run a mutation

```tsx
const setText = useSetText();

const update = setText.mutateEffect({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

The typed Core failure remains in the Effect error channel. The hook updates its mutation state
when the Effect is run through the returned control.

## Compose atoms directly

Import atom factories from `@ensforge/react/atoms` for derived state or registry-level composition.

```ts [owner-atom.ts]
import { getOwnerAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

export const ownerAtom = getOwnerAtom(ens, { name: "example.eth" }, { staleTime: 60_000 });
```

Hooks use the same factories with the SDK and registry supplied by `EnsforgeProvider`, so direct
atoms and hooks can share cache identity when their inputs match.
