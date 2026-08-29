---
title: Why ensforge
description: Learn how ensforge brings ENS queries and mutations to React.
---

# Why ensforge

ensforge React turns the complete SDK action surface into reactive hooks and Effect Atom primitives.
It provides caching, deduplication, retries, selection, refetching, Suspense, mutation state, and
invalidation without introducing a second ENS execution model.

```tsx
const owner = useOwner({ name: "ens.eth" });
const ownerSuspense = useOwnerSuspense({ name: "ens.eth" });
```

Read hooks expose both familiar state fields and the underlying `AsyncResult`. Mutation hooks expose
callback, Promise, and Effect execution forms. Advanced applications can import the same atoms used
by the hooks and compose them directly.
