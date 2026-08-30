---
title: useGetOrCreateResolver
description: Hook for fetching or create resolver.
---

# useGetOrCreateResolver

Hook for fetching or create resolver.

## Import

```tsx
import { useGetOrCreateResolver } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useGetOrCreateResolver } from "@ensforge/react";

function Component() {
  const mutation = useGetOrCreateResolver();

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
import type { GetOrCreateResolverParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useGetOrCreateResolver>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createGetOrCreateResolverMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createGetOrCreateResolverMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getOrCreateResolver`](/core/api/actions/resolution/get-or-create-resolver)
- [`sdk.resolution.getOrCreateResolver`](/sdk/api/resolution/get-or-create-resolver)
