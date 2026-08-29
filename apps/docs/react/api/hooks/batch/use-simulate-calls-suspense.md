---
title: useSimulateCallsSuspense
description: Suspense hook for simulating calls.
---

# useSimulateCallsSuspense

Suspense hook for simulating calls.

## Import

```tsx
import { useSimulateCallsSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useSimulateCallsSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useSimulateCallsSuspense>[0];
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
type Result = ReturnType<typeof useSimulateCallsSuspense>;
```

## Effect Atom

```ts
import { simulateCallsAtom } from "@ensforge/react/atoms";

const atom = simulateCallsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`simulateCalls`](/core/api/actions/batch/simulate-calls)
- [`sdk.batch.simulateCalls`](/sdk/api/batch/simulate-calls)
