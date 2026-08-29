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

```tsx
function Component() {
  const mutation = useApprovePaymentToken();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useApprovePaymentToken>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### paymentToken

`string`

Payment token used by a supported registrar.

### amount

`bigint`

Token approval amount.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useApprovePaymentToken>;
```

## Effect Atom

```ts
import { createApprovePaymentTokenMutationAtom } from "@ensforge/react/atoms";

const atom = createApprovePaymentTokenMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`approvePaymentToken`](/core/api/actions/registration/approve-payment-token)
- [`sdk.registration.approvePaymentToken`](/sdk/api/registration/approve-payment-token)
