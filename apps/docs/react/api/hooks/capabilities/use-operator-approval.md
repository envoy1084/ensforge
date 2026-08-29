---
title: useOperatorApproval
description: Hook for fetching operator approval.
---

# useOperatorApproval

Hook for fetching operator approval.

## Import

```tsx
import { useOperatorApproval } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useOperatorApproval({
    name: "example.eth",
    owner: "0x0000000000000000000000000000000000000001",
    operator: "0x0000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useOperatorApproval>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useOperatorApproval>;
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
