---
title: useIsPaymentTokenSupportedSuspense
description: Suspense hook for checking whether the name is payment token supported.
---

# useIsPaymentTokenSupportedSuspense

Suspense hook for checking whether the name is payment token supported.

## Import

```tsx
import { useIsPaymentTokenSupportedSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsPaymentTokenSupportedSuspense({
    paymentToken: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsPaymentTokenSupportedSuspense>[0];
```

### paymentToken

`EthereumAddress`

Payment token used by a supported registrar.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { isPaymentTokenSupportedAtom } from "@ensforge/react/atoms";

const atom = isPaymentTokenSupportedAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isPaymentTokenSupported`](/core/api/actions/registration/is-payment-token-supported)
- [`sdk.registration.isPaymentTokenSupported`](/sdk/api/registration/is-payment-token-supported)
