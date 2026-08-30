---
title: Why ensforge
description: Learn how ensforge brings ENS reads and mutations to React with Effect Atom.
---

# Why ensforge

ensforge React turns the complete SDK action surface into reactive hooks and Effect Atom primitives.
It provides shared execution, typed retry schedules, mapping, refreshing, Suspense, mutation state, and
invalidation without introducing a second ENS execution model.

```tsx
const owner = useOwner({ name: "sdk.eth" });
const ownerSuspense = useOwnerSuspense({ name: "sdk.eth" });
```

Read hooks expose small state projections and the underlying `AsyncResult`. Mutation hooks expose
`Exit` callback, Promise, and Effect execution forms. Advanced applications can import the same atoms used
by the hooks and compose them directly.
