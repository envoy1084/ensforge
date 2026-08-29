---
title: useWrapperExpiry
description: Hook for fetching wrapper expiry.
---

# useWrapperExpiry

Hook for fetching wrapper expiry.

## Import

```tsx
import { useWrapperExpiry } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useWrapperExpiry({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useWrapperExpiry>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useWrapperExpiry>;
```

## Effect Atom

```ts
import { getWrapperExpiryAtom } from "@ensforge/react/atoms";

const atom = getWrapperExpiryAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getWrapperExpiry`](/core/api/actions/wrapping/get-wrapper-expiry)
- [`sdk.wrapping.getWrapperExpiry`](/sdk/api/wrapping/get-wrapper-expiry)
