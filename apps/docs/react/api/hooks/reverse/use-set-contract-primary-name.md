---
title: useSetContractPrimaryName
description: Hook for setting contract primary name.
---

# useSetContractPrimaryName

Hook for setting contract primary name.

## Import

```tsx
import { useSetContractPrimaryName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetContractPrimaryName } from "@ensforge/react";

function Component() {
  const mutation = useSetContractPrimaryName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          contract: "value",
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
import type { SetContractPrimaryNameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetContractPrimaryName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetContractPrimaryNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetContractPrimaryNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setContractPrimaryName`](/core/api/actions/reverse/set-contract-primary-name)
- [`sdk.reverse.setContractPrimaryName`](/sdk/api/reverse/set-contract-primary-name)
