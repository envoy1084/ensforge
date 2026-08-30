---
title: useSetSubnameResolver
description: Hook for setting subname resolver.
---

# useSetSubnameResolver

Hook for setting subname resolver.

## Import

```tsx
import { useSetSubnameResolver } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetSubnameResolver } from "@ensforge/react";

function Component() {
  const mutation = useSetSubnameResolver();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          resolver: "0x0000000000000000000000000000000000000001",
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
import type { SetSubnameResolverParameters } from "@ensforge/sdk/subnames";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetSubnameResolver>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetSubnameResolverMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetSubnameResolverMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setSubnameResolver`](/core/api/actions/subnames/set-subname-resolver)
- [`sdk.subnames.setSubnameResolver`](/sdk/api/subnames/set-subname-resolver)
