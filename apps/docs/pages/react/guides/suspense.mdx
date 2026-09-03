---
title: Suspense
description: Read ENS data through React Suspense and error boundaries.
---

# Suspense

Each standard read hook has a `Suspense` counterpart. Suspense hooks return successful data directly
and move pending and failure UI to React boundaries.

```tsx
import { Suspense } from "react";
import { useOwnerSuspense } from "@ensforge/react";

function Profile({ name }: { name: string }) {
  const { data, isWaiting } = useOwnerSuspense({ name });
  return <span aria-busy={isWaiting}>{data?.owner ?? "Unowned"}</span>;
}

export function Page() {
  return (
    <ErrorBoundary fallback={<p>Unable to load name</p>}>
      <Suspense fallback={<p>Loading…</p>}>
        <Profile name="example.eth" />
      </Suspense>
    </ErrorBoundary>
  );
}
```

## Parameters

Suspense hooks accept the same action parameters and nested `atom` options as standard hooks. They
also accept `map`, but not `enabled`: a Suspense hook always executes when rendered.

## Return type

`EnsSuspenseAtomResult<Success>` contains:

- `data`: guaranteed successful selected data.
- `isWaiting`: whether a background refresh is active.
- `updatedAt`: timestamp of the successful value.

Use standard hooks when loading and error UI should remain local to a component.
