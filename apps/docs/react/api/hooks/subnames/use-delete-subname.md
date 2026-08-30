---
title: useDeleteSubname
description: Hook for deleting subname.
---

# useDeleteSubname

Hook for deleting subname.

## Import

```tsx
import { useDeleteSubname } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useDeleteSubname } from "@ensforge/react";

function Component() {
  const mutation = useDeleteSubname();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
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
import type { DeleteSubnameParameters } from "@ensforge/sdk/subnames";
```

## Return Type

```ts
type Result = ReturnType<typeof useDeleteSubname>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createDeleteSubnameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createDeleteSubnameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`deleteSubname`](/core/api/actions/subnames/delete-subname)
- [`sdk.subnames.deleteSubname`](/sdk/api/subnames/delete-subname)
