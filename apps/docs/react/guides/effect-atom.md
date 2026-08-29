---
title: Effect Atom
description: Compose the atoms that power Ensforge React hooks.
---

# Effect Atom

Every generated query or mutation hook is backed by a public Effect Atom factory.

```ts
import { getOwnerAtom } from "@ensforge/react";

const atom = getOwnerAtom(sdk, { name: "ens.eth" }, options);
```

Use the hook for normal components. Import the atom when you need derived atoms, an external registry,
server prefetching, or composition with other Effect Atom state.

Query atom factories receive the SDK, action parameters, and resolved query options. Mutation atom
factories receive the SDK and accept parameters through the registry when executed.

`makeQueryAtom`, `makeMutationAtom`, and `makeStreamAtom` are public for extensions that follow the
same cache-key and AsyncResult conventions.
