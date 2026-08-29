---
title: useCallsStatusSuspense
description: Suspense hook for fetching calls status.
---

# useCallsStatusSuspense

Suspense hook for fetching calls status.

## Import

```tsx
import { useCallsStatusSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useCallsStatusSuspense({
    id: "0x1234",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useCallsStatusSuspense>[0];
```

### id

`string`

Submitted wallet batch identifier.

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
type Result = ReturnType<typeof useCallsStatusSuspense>;
```

## Effect Atom

```ts
import { getCallsStatusAtom } from "@ensforge/react/atoms";

const atom = getCallsStatusAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getCallsStatus`](/core/api/actions/batch/get-calls-status)
- [`sdk.batch.getCallsStatus`](/sdk/api/batch/get-calls-status)
