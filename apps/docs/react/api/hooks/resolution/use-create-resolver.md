---
title: useCreateResolver
description: Hook for creating resolver.
---

# useCreateResolver

Hook for creating resolver.

## Import

```tsx
import { useCreateResolver } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useCreateResolver } from "@ensforge/react";

function Component() {
  const mutation = useCreateResolver();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          salt: 1n,
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
import type { CreateResolverParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useCreateResolver>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createCreateResolverMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createCreateResolverMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`createResolver`](/core/api/actions/resolution/create-resolver)
- [`sdk.resolution.createResolver`](/sdk/api/resolution/create-resolver)
