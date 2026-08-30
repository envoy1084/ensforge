---
title: useSetManager
description: Hook for setting manager.
---

# useSetManager

Hook for setting manager.

## Import

```tsx
import { useSetManager } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetManager } from "@ensforge/react";

function Component() {
  const mutation = useSetManager();

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
import type { SetManagerParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetManager>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetManagerMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetManagerMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setManager`](/core/api/actions/ownership/set-manager)
- [`sdk.ownership.setManager`](/sdk/api/ownership/set-manager)
