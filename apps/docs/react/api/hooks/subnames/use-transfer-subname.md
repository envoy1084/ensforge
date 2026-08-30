---
title: useTransferSubname
description: Hook for transferring subname.
---

# useTransferSubname

Hook for transferring subname.

## Import

```tsx
import { useTransferSubname } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTransferSubname } from "@ensforge/react";

function Component() {
  const mutation = useTransferSubname();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          to: "value",
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
import type { TransferSubnameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useTransferSubname>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createTransferSubnameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createTransferSubnameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`transferSubname`](/core/api/actions/subnames/transfer-subname)
- [`sdk.subnames.transferSubname`](/sdk/api/subnames/transfer-subname)
