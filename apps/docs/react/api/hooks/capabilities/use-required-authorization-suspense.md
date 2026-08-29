---
title: useRequiredAuthorizationSuspense
description: Suspense hook for fetching required authorization.
---

# useRequiredAuthorizationSuspense

Suspense hook for fetching required authorization.

## Import

```tsx
import { useRequiredAuthorizationSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useRequiredAuthorizationSuspense({
    name: "example.eth",
    account: {},
    operation: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useRequiredAuthorizationSuspense>[0];
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

### account

`EthereumAddress`

Account used for authorization and execution.

### operation

`WriteOperation`

Value used for `operation` by this operation.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useRequiredAuthorizationSuspense>;
```

## Effect Atom

```ts
import { getRequiredAuthorizationAtom } from "@ensforge/react/atoms";

const atom = getRequiredAuthorizationAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getRequiredAuthorization`](/core/api/actions/capabilities/get-required-authorization)
- [`sdk.capabilities.getRequiredAuthorization`](/sdk/api/capabilities/get-required-authorization)
