---
title: useCreateSubname
description: Hook for creating subname.
---

# useCreateSubname

Hook for creating subname.

## Import

```tsx
import { useCreateSubname } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCreateSubname } from "@ensforge/react";

function Component() {
  const mutation = useCreateSubname();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          owner: "0x0000000000000000000000000000000000000001",
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
import type { CreateSubnameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useCreateSubname>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createCreateSubnameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createCreateSubnameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`createSubname`](/core/api/actions/subnames/create-subname)
- [`sdk.subnames.createSubname`](/sdk/api/subnames/create-subname)
