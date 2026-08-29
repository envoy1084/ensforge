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
  const { data, isFetching } = useOwnerSuspense({ name });
  return <span aria-busy={isFetching}>{data?.owner ?? "Unowned"}</span>;
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

Suspense hooks accept the same action parameters and query options as standard hooks except
`query.enabled`. They always execute when rendered.

## Return type

`EnsSuspenseQueryResult<Success>` contains:

- `data`: guaranteed successful selected data.
- `isFetching`: whether a background refresh is active.
- `updatedAt`: timestamp of the successful value.

Use standard hooks when loading and error UI should remain local to a component.
