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

```tsx
function Component() {
  const mutation = useApproveRenewalPayment();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useApproveRenewalPayment>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### name

`string`

ENS name used by the query or mutation.

### duration

`bigint`

Duration in seconds.

### paymentToken

`string`

Payment token used by a supported registrar.

### amount

`bigint`

Token approval amount.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useApproveRenewalPayment>;
```

## Effect Atom

```ts
import { createApproveRenewalPaymentMutationAtom } from "@ensforge/react/atoms";

const atom = createApproveRenewalPaymentMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`approveRenewalPayment`](/core/api/actions/registration/approve-renewal-payment)
- [`sdk.registration.approveRenewalPayment`](/sdk/api/registration/approve-renewal-payment)
