---
title: useReclaimName
description: Hook for reclaiming name.
---

# useReclaimName

Hook for reclaiming name.

## Import

```tsx
import { useReclaimName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useReclaimName } from "@ensforge/react";

function Component() {
  const mutation = useReclaimName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          manager: "0x0000000000000000000000000000000000000001",
        })
      }
    >
      Submit
    </button>
  );
}
```

<<< @/snippets/react/provider.tsx

:::

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

```ts
import type { ReclaimNameParameters } from "@ensforge/sdk/ownership";
```

## Return Type

```ts
type Result = ReturnType<typeof useReclaimName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createReclaimNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createReclaimNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`reclaimName`](/core/api/actions/ownership/reclaim-name)
- [`sdk.ownership.reclaimName`](/sdk/api/ownership/reclaim-name)
