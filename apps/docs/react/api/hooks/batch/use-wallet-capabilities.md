---
title: useWalletCapabilities
description: Hook for fetching wallet capabilities.
---

# useWalletCapabilities

Hook for fetching wallet capabilities.

## Import

```tsx
import { useWalletCapabilities } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useWalletCapabilities({});

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useWalletCapabilities>[0];
```

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useWalletCapabilities>;
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
