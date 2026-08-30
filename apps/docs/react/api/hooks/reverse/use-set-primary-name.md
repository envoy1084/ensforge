---
title: useSetPrimaryName
description: Hook for setting primary name.
---

# useSetPrimaryName

Hook for setting primary name.

## Import

```tsx
import { useSetPrimaryName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetPrimaryName } from "@ensforge/react";

function Component() {
  const mutation = useSetPrimaryName();

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
import type { SetPrimaryNameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetPrimaryName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetPrimaryNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetPrimaryNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setPrimaryName`](/core/api/actions/reverse/set-primary-name)
- [`sdk.reverse.setPrimaryName`](/sdk/api/reverse/set-primary-name)
