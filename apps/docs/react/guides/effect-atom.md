---
title: Effect Atom
description: Compose the atoms that power ensforge React hooks.
---

# Effect Atom

Every generated query or mutation hook is backed by a public Effect Atom factory.

```ts
import { getOwnerAtom } from "@ensforge/react/atoms";

const atom = getOwnerAtom(sdk, { name: "sdk.eth" }, options);
```

Use the hook for normal components. Import the atom when you need derived atoms, an external registry,
server prefetching, or composition with other Effect Atom state.

Read atom factories receive the SDK, action parameters, and optional `EnsAtomOptions`. Mutation
atom factories receive the SDK and accept parameters through the registry when executed.

`makeQueryAtom`, `makeMutationAtom`, and `makeStreamAtom` are public for extensions that follow the
same cache-key and AsyncResult conventions.
