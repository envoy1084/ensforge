---
title: usePrepareCalls
description: Hook for preparing calls.
---

# usePrepareCalls

Hook for preparing calls.

## Import

```tsx
import { usePrepareCalls } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = usePrepareCalls({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof usePrepareCalls>[0];
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
type Result = ReturnType<typeof usePrepareCalls>;
```

## Effect Atom

```ts
import { prepareCallsAtom } from "@ensforge/react/atoms";

const atom = prepareCallsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`prepareCalls`](/core/api/actions/batch/prepare-calls)
- [`sdk.batch.prepareCalls`](/sdk/api/batch/prepare-calls)
