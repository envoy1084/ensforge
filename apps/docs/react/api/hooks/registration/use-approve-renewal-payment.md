---
title: useApproveRenewalPayment
description: Hook for approving renewal payment.
---

# useApproveRenewalPayment

Hook for approving renewal payment.

## Import

```tsx
import { useApproveRenewalPayment } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useApproveRenewalPayment } from "@ensforge/react";

function Component() {
  const mutation = useApproveRenewalPayment();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          duration: 365n * 24n * 60n * 60n,
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
import type { ApproveRenewalPaymentParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useApproveRenewalPayment>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createApproveRenewalPaymentMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createApproveRenewalPaymentMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`approveRenewalPayment`](/core/api/actions/registration/approve-renewal-payment)
- [`sdk.registration.approveRenewalPayment`](/sdk/api/registration/approve-renewal-payment)
