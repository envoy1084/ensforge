---
title: useWalletCapabilitiesSuspense
description: Suspense hook for fetching wallet capabilities.
---

# useWalletCapabilitiesSuspense

Suspense hook for fetching wallet capabilities.

## Import

```tsx
import { useWalletCapabilitiesSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useWalletCapabilitiesSuspense({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useWalletCapabilitiesSuspense>[0];
```

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useWalletCapabilitiesSuspense>;
```

## Effect Atom

```ts
import { getWalletCapabilitiesAtom } from "@ensforge/react/atoms";

const atom = getWalletCapabilitiesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getWalletCapabilities`](/core/api/actions/batch/get-wallet-capabilities)
- [`sdk.batch.getWalletCapabilities`](/sdk/api/batch/get-wallet-capabilities)
