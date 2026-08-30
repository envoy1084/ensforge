---
title: useSetInterface
description: Hook for setting interface.
---

# useSetInterface

Hook for setting interface.

## Import

```tsx
import { useSetInterface } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetInterface } from "@ensforge/react";

function Component() {
  const mutation = useSetInterface();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          interfaceId: "0x01ffc9a7",
          implementer: "0x0000000000000000000000000000000000000001",
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
import type { SetInterfaceParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetInterface>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetInterfaceMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetInterfaceMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setInterface`](/core/api/actions/records/set-interface)
- [`sdk.records.setInterface`](/sdk/api/records/set-interface)
