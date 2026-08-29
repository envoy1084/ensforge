---
title: useEstimateCallsSuspense
description: Suspense hook for estimating calls.
---

# useEstimateCallsSuspense

Suspense hook for estimating calls.

## Import

```tsx
import { useEstimateCallsSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useEstimateCallsSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useEstimateCallsSuspense>[0];
```

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read requests or write intents included in the operation.

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
type Result = ReturnType<typeof useEstimateCallsSuspense>;
```

## Effect Atom

```ts
import { estimateCallsAtom } from "@ensforge/react/atoms";

const atom = estimateCallsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`estimateCalls`](/core/api/actions/batch/estimate-calls)
- [`sdk.batch.estimateCalls`](/sdk/api/batch/estimate-calls)
