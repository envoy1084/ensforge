---
title: useApprovePaymentToken
description: Hook for approving payment token.
---

# useApprovePaymentToken

Hook for approving payment token.

## Import

```tsx
import { useApprovePaymentToken } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useApprovePaymentToken } from "@ensforge/react";

function Component() {
  const mutation = useApprovePaymentToken();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          paymentToken: "0x0000000000000000000000000000000000000001",
          amount: 1_000_000n,
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
import type { ApprovePaymentTokenParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useApprovePaymentToken>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createApprovePaymentTokenMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createApprovePaymentTokenMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`approvePaymentToken`](/core/api/actions/registration/approve-payment-token)
- [`sdk.registration.approvePaymentToken`](/sdk/api/registration/approve-payment-token)
