---
title: useTransferName
description: Hook for transferring name.
---

# useTransferName

Hook for transferring name.

## Import

```tsx
import { useTransferName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTransferName } from "@ensforge/react";

function Component() {
  const mutation = useTransferName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          to: "value",
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
import type { TransferNameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useTransferName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createTransferNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createTransferNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`transferName`](/core/api/actions/ownership/transfer-name)
- [`sdk.ownership.transferName`](/sdk/api/ownership/transfer-name)
