---
title: usePredictResolverAddressSuspense
description: Suspense hook for running predict resolver address.
---

# usePredictResolverAddressSuspense

Suspense hook for running predict resolver address.

## Import

```tsx
import { usePredictResolverAddressSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = usePredictResolverAddressSuspense({
    salt: 1n,
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof usePredictResolverAddressSuspense>[0];
```

### salt

`bigint`

Value used for `salt` by this operation.

### admin

`string | undefined`

Value used for `admin` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this operation.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof usePredictResolverAddressSuspense>;
```

## Effect Atom

```ts
import { predictResolverAddressAtom } from "@ensforge/react/atoms";

const atom = predictResolverAddressAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`predictResolverAddress`](/core/api/actions/resolution/predict-resolver-address)
- [`sdk.resolution.predictResolverAddress`](/sdk/api/resolution/predict-resolver-address)
