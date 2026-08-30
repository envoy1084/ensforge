---
title: useSetSubnameManager
description: Hook for setting subname manager.
---

# useSetSubnameManager

Hook for setting subname manager.

## Import

```tsx
import { useSetSubnameManager } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetSubnameManager } from "@ensforge/react";

function Component() {
  const mutation = useSetSubnameManager();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          manager: "0x0000000000000000000000000000000000000001",
          name: "example.eth",
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
import type { SetSubnameManagerParameters } from "@ensforge/sdk/subnames";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetSubnameManager>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetSubnameManagerMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetSubnameManagerMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setSubnameManager`](/core/api/actions/subnames/set-subname-manager)
- [`sdk.subnames.setSubnameManager`](/sdk/api/subnames/set-subname-manager)
