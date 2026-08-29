---
title: usePrepareCallsSuspense
description: Suspense hook for preparing calls.
---

# usePrepareCallsSuspense

Suspense hook for preparing calls.

## Import

```tsx
import { usePrepareCallsSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = usePrepareCallsSuspense({
    calls: [],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof usePrepareCallsSuspense>[0];
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
type Result = ReturnType<typeof usePrepareCallsSuspense>;
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
