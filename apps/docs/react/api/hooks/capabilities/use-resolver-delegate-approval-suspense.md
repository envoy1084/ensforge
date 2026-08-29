---
title: useResolverDelegateApprovalSuspense
description: Suspense hook for fetching resolver delegate approval.
---

# useResolverDelegateApprovalSuspense

Suspense hook for fetching resolver delegate approval.

## Import

```tsx
import { useResolverDelegateApprovalSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverDelegateApprovalSuspense({
    name: "example.eth",
    owner: "0x0000000000000000000000000000000000000001",
    delegate: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverDelegateApprovalSuspense>[0];
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

### delegate

`EthereumAddress`

Resolver delegate whose permissions are read or changed.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useResolverDelegateApprovalSuspense>;
```

## Effect Atom

```ts
import { getResolverDelegateApprovalAtom } from "@ensforge/react/atoms";

const atom = getResolverDelegateApprovalAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getResolverDelegateApproval`](/core/api/actions/capabilities/get-resolver-delegate-approval)
- [`sdk.capabilities.getResolverDelegateApproval`](/sdk/api/capabilities/get-resolver-delegate-approval)
