---
title: useCallsStatus
description: Hook for fetching calls status.
---

# useCallsStatus

Hook for fetching calls status.

## Import

```tsx
import { useCallsStatus } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useCallsStatus({
    id: "0x1234",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useCallsStatus>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useCallsStatus>;
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
