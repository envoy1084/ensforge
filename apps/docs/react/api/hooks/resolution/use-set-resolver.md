---
title: useSetResolver
description: Hook for setting resolver.
---

# useSetResolver

Hook for setting resolver.

## Import

```tsx
import { useSetResolver } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetResolver } from "@ensforge/react";

function Component() {
  const mutation = useSetResolver();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          resolver: "0x0000000000000000000000000000000000000001",
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
import type { SetResolverParameters } from "@ensforge/sdk/resolution";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetResolver>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetResolverMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetResolverMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setResolver`](/core/api/actions/resolution/set-resolver)
- [`sdk.resolution.setResolver`](/sdk/api/resolution/set-resolver)
