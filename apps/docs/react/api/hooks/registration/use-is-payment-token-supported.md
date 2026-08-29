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

```tsx
function Component() {
  const result = useIsPaymentTokenSupported({
    paymentToken: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsPaymentTokenSupported>[0];
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

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useIsPaymentTokenSupported>;
```

## Effect Atom

```ts
import { isPaymentTokenSupportedAtom } from "@ensforge/react/atoms";

const atom = isPaymentTokenSupportedAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isPaymentTokenSupported`](/core/api/actions/registration/is-payment-token-supported)
- [`sdk.registration.isPaymentTokenSupported`](/sdk/api/registration/is-payment-token-supported)
