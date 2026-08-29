---
title: Suspense
description: Read ENS data through Suspense query hooks.
---

# Suspense

Every standard read hook has a `Suspense` counterpart.

```tsx
function Profile({ name }: { name: string }) {
  const owner = useOwnerSuspense({ name });
  return <span>{owner.data?.owner}</span>;
}

function Page() {
  return (
    <Suspense fallback={<span>Loading…</span>}>
      <Profile name="ens.eth" />
    </Suspense>
  );
}
```

Suspense hooks throw the pending Effect promise to the nearest boundary and throw failures to the
nearest error boundary. Their return value contains successful data and refetch controls, so loading
and error branches are handled outside the component.

Use ordinary query hooks when loading and error UI should remain local to the component.
