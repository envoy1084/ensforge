---
title: useSetTtl
description: Hook for setting ttl.
---

# useSetTtl

Hook for setting ttl.

## Import

```tsx
import { useSetTtl } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetTtl } from "@ensforge/react";

function Component() {
  const mutation = useSetTtl();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          ttl: 300n,
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
import type { SetTtlParameters } from "@ensforge/sdk/ownership";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetTtl>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetTtlMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetTtlMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setTtl`](/core/api/actions/ownership/set-ttl)
- [`sdk.ownership.setTtl`](/sdk/api/ownership/set-ttl)
