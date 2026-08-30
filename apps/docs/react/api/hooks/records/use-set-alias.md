---
title: useSetAlias
description: Hook for setting alias.
---

# useSetAlias

Hook for setting alias.

## Import

```tsx
import { useSetAlias } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetAlias } from "@ensforge/react";

function Component() {
  const mutation = useSetAlias();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          target: "0x0000000000000000000000000000000000000001",
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
import type { SetAliasParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetAlias>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetAliasMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetAliasMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setAlias`](/core/api/actions/records/set-alias)
- [`sdk.records.setAlias`](/sdk/api/records/set-alias)
