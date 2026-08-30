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

### map

`(value: Success) => Mapped | undefined`

Maps successful data for this hook without changing the value stored by the underlying atom.

### atom

`EnsAtomOptions<Failure> | undefined`

Controls retries, refreshes, disposal, and stale-while-revalidate behavior. Suspense hooks always execute and do not accept `enabled`.

| Property          | Type                         | Default       | Description                                     |
| ----------------- | ---------------------------- | ------------- | ----------------------------------------------- |
| `idleTTL`         | `Duration.Input`             | `"5 minutes"` | Retains an unused atom before it is disposed.   |
| `refreshInterval` | `false \| Duration.Input`    | `false`       | Refreshes the atom while it remains subscribed. |
| `retry`           | `false \| Schedule`          | `false`       | Retries typed failures with an Effect schedule. |
| `swr`             | `false \| EnsAtomSwrOptions` | enabled       | Configures stale-while-revalidate behavior.     |

See [Atom Options](/react/api/atom-options) for focused examples.

## Return Type

Returns `EnsSuspenseAtomResult` with successful data, `isWaiting`, and `updatedAt`. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useIsPaymentTokenSupportedSuspense>;
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
