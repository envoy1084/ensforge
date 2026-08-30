---
title: useSetChildFuses
description: Hook for setting child fuses.
---

# useSetChildFuses

Hook for setting child fuses.

## Import

```tsx
import { useSetChildFuses } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetChildFuses } from "@ensforge/react";

function Component() {
  const mutation = useSetChildFuses();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          expiry: 2_000_000_000n,
          name: "example.eth",
          fuses: [],
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
import type { SetChildFusesParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetChildFuses>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetChildFusesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetChildFusesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setChildFuses`](/core/api/actions/wrapping/set-child-fuses)
- [`sdk.wrapping.setChildFuses`](/sdk/api/wrapping/set-child-fuses)
