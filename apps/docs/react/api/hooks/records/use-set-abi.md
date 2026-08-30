---
title: useSetAbi
description: Hook for setting abi.
---

# useSetAbi

Hook for setting abi.

## Import

```tsx
import { useSetAbi } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetAbi } from "@ensforge/react";

function Component() {
  const mutation = useSetAbi();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          contentType: {},
          value: "https://example.com",
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
import type { SetAbiParameters } from "@ensforge/sdk/records";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetAbi>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetAbiMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetAbiMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setAbi`](/core/api/actions/records/set-abi)
- [`sdk.records.setAbi`](/sdk/api/records/set-abi)
