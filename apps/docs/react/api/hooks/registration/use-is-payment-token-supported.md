---
title: useIsPaymentTokenSupported
description: Hook for checking whether the name is payment token supported.
---

# useIsPaymentTokenSupported

Hook for checking whether the name is payment token supported.

## Import

```tsx
import { useIsPaymentTokenSupported } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useIsPaymentTokenSupported } from "@ensforge/react";

function Component() {
  const result = useIsPaymentTokenSupported({
    paymentToken: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

<ReadActionDemo action="registration.isPaymentTokenSupported" />

## Parameters

```ts
import type { UseEnsAtomParameters } from "@ensforge/react";
import type { IsPaymentTokenSupportedParameters } from "@ensforge/sdk/registration";
```

### paymentToken

`EthereumAddress`

Payment token used by a supported registrar.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useIsPaymentTokenSupported>;
```

<!--@include: @/shared/react/atom-result.md-->

## Suspense

Use `useIsPaymentTokenSupportedSuspense` when the read belongs beneath React [Suspense](https://react.dev/reference/react/Suspense) and an error boundary. It starts immediately, suspends during the initial load, and throws typed failures to the nearest error boundary.

### Import

```tsx
import { useIsPaymentTokenSupportedSuspense } from "@ensforge/react";
```

### Usage

```tsx
function Component() {
  const result = useIsPaymentTokenSupportedSuspense({
    paymentToken: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

### Parameters

`useIsPaymentTokenSupportedSuspense` accepts the same operation parameters described above. Its Effect Atom options omit `enabled` because a Suspense read always executes.

```ts
type Parameters = Parameters<typeof useIsPaymentTokenSupportedSuspense>[0];
```

<!--@include: @/shared/react/suspense-atom-parameters.md-->

### Return Type

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { isPaymentTokenSupportedAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = isPaymentTokenSupportedAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`isPaymentTokenSupported`](/core/api/actions/registration/is-payment-token-supported)
- [`sdk.registration.isPaymentTokenSupported`](/sdk/api/registration/is-payment-token-supported)
