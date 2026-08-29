---
title: useEstimateCalls
description: Hook for estimating calls.
---

# useEstimateCalls

Hook for estimating calls.

## Import

```tsx
import { useEstimateCalls } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useEstimateCalls({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useEstimateCalls>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useEstimateCalls>;
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
