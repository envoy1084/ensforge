---
title: useOperatorApprovalSuspense
description: Suspense hook for fetching operator approval.
---

# useOperatorApprovalSuspense

Suspense hook for fetching operator approval.

## Import

```tsx
import { useOperatorApprovalSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useOperatorApprovalSuspense({
    name: "example.eth",
    owner: "0x0000000000000000000000000000000000000001",
    operator: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useOperatorApprovalSuspense>[0];
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

### owner

`EthereumAddress`

Address that should own the name or resource.

### operator

`EthereumAddress`

Operator whose approval is read or changed.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useOperatorApprovalSuspense>;
```

## Effect Atom

```ts
import { getOperatorApprovalAtom } from "@ensforge/react/atoms";

const atom = getOperatorApprovalAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getOperatorApproval`](/core/api/actions/capabilities/get-operator-approval)
- [`sdk.capabilities.getOperatorApproval`](/sdk/api/capabilities/get-operator-approval)
