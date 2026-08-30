---
title: useSetFuses
description: Hook for setting fuses.
---

# useSetFuses

Hook for setting fuses.

## Import

```tsx
import { useSetFuses } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetFuses } from "@ensforge/react";

function Component() {
  const mutation = useSetFuses();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
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
import type { SetFusesParameters } from "@ensforge/sdk/wrapping";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetFuses>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetFusesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetFusesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setFuses`](/core/api/actions/wrapping/set-fuses)
- [`sdk.wrapping.setFuses`](/sdk/api/wrapping/set-fuses)
