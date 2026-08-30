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

## Parameters

```ts
import type { IsPaymentTokenSupportedParameters, UseEnsAtomParameters } from "@ensforge/react";
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
