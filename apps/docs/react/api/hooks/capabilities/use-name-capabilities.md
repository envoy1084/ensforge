---
title: useNameCapabilities
description: Hook for fetching name capabilities.
---

# useNameCapabilities

Hook for fetching name capabilities.

## Import

```tsx
import { useNameCapabilities } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useNameCapabilities({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useNameCapabilities>[0];
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

### records

`ReadonlyArray<RecordOperation> | undefined`

Records selected, read, or written.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useNameCapabilities>;
```

## Effect Atom

```ts
import { getNameCapabilitiesAtom } from "@ensforge/react/atoms";

const atom = getNameCapabilitiesAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getNameCapabilities`](/core/api/actions/capabilities/get-name-capabilities)
- [`sdk.capabilities.getNameCapabilities`](/sdk/api/capabilities/get-name-capabilities)
