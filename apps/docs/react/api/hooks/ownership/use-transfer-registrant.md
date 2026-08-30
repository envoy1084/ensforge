---
title: useTransferRegistrant
description: Hook for transferring registrant.
---

# useTransferRegistrant

Hook for transferring registrant.

## Import

```tsx
import { useTransferRegistrant } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useTransferRegistrant } from "@ensforge/react";

function Component() {
  const mutation = useTransferRegistrant();

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
import type { TransferRegistrantParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useTransferRegistrant>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createTransferRegistrantMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createTransferRegistrantMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`transferRegistrant`](/core/api/actions/ownership/transfer-registrant)
- [`sdk.ownership.transferRegistrant`](/sdk/api/ownership/transfer-registrant)
