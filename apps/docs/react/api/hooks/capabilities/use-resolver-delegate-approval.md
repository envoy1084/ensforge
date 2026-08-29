---
title: useResolverDelegateApproval
description: Hook for fetching resolver delegate approval.
---

# useResolverDelegateApproval

Hook for fetching resolver delegate approval.

## Import

```tsx
import { useResolverDelegateApproval } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useResolverDelegateApproval({
    name: "example.eth",
    owner: "0x0000000000000000000000000000000000000001",
    delegate: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useResolverDelegateApproval>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useResolverDelegateApproval>;
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
