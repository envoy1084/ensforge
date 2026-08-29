---
title: useTokenApprovalSuspense
description: Suspense hook for fetching token approval.
---

# useTokenApprovalSuspense

Suspense hook for fetching token approval.

## Import

```tsx
import { useTokenApprovalSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useTokenApprovalSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useTokenApprovalSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useTokenApprovalSuspense>;
```

## Effect Atom

```ts
import { getTokenApprovalAtom } from "@ensforge/react/atoms";

const atom = getTokenApprovalAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getTokenApproval`](/core/api/actions/capabilities/get-token-approval)
- [`sdk.capabilities.getTokenApproval`](/sdk/api/capabilities/get-token-approval)
