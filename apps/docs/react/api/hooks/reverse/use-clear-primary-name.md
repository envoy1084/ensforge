---
title: useClearPrimaryName
description: Hook for clearing primary name.
---

# useClearPrimaryName

Hook for clearing primary name.

## Import

```tsx
import { useClearPrimaryName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useClearPrimaryName } from "@ensforge/react";

function Component() {
  const mutation = useClearPrimaryName();

  return (
    <button disabled={mutation.isWaiting} onClick={() => mutation.mutate({})}>
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
import type { ClearPrimaryNameParameters } from "@ensforge/sdk/reverse";
```

## Return Type

```ts
type Result = ReturnType<typeof useClearPrimaryName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createClearPrimaryNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createClearPrimaryNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`clearPrimaryName`](/core/api/actions/reverse/clear-primary-name)
- [`sdk.reverse.clearPrimaryName`](/sdk/api/reverse/clear-primary-name)
