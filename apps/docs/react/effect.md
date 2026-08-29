---
title: Effect
description: Use Effect values exposed by Ensforge React hooks and atoms.
---

# Effect

Ensforge React keeps Effect available at the UI boundary. Query results expose `refetchEffect`, and
mutation results expose `mutateEffect`.

```tsx
const owner = useOwner({ name: "ens.eth" });
const setText = useSetText();

const refetch = owner.refetchEffect();
const update = setText.mutateEffect({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

Hooks also expose the underlying Effect `AsyncResult`. Import atoms directly when you need custom
derived state or registry-level composition beyond a component hook.
