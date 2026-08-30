---
title: useUpgradeResolver
description: Hook for upgrading resolver.
---

# useUpgradeResolver

Hook for upgrading resolver.

## Import

```tsx
import { useUpgradeResolver } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useUpgradeResolver } from "@ensforge/react";

function Component() {
  const mutation = useUpgradeResolver();

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
import type { UpgradeResolverParameters } from "@ensforge/sdk/resolution";
```

## Return Type

```ts
type Result = ReturnType<typeof useUpgradeResolver>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createUpgradeResolverMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createUpgradeResolverMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`upgradeResolver`](/core/api/actions/resolution/upgrade-resolver)
- [`sdk.resolution.upgradeResolver`](/sdk/api/resolution/upgrade-resolver)
