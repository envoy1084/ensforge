---
title: useWrapName
description: Hook for wrapping name.
---

# useWrapName

Hook for wrapping name.

## Import

```tsx
import { useWrapName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useWrapName } from "@ensforge/react";

function Component() {
  const mutation = useWrapName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          owner: "0x0000000000000000000000000000000000000001",
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
import type { WrapNameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useWrapName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createWrapNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createWrapNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`wrapName`](/core/api/actions/wrapping/wrap-name)
- [`sdk.wrapping.wrapName`](/sdk/api/wrapping/wrap-name)
