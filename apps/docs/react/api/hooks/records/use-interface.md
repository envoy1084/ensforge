---
title: useInterface
description: Hook for fetching interface.
---

# useInterface

Hook for fetching interface.

## Import

```tsx
import { useInterface } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useInterface({
    name: "example.eth",
    interfaceId: "0x01ffc9a7",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useInterface>[0];
```

### name

`string`

ENS name used by the query or mutation.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

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
type Result = ReturnType<typeof useInterface>;
```

## Effect Atom

```ts
import { getInterfaceAtom } from "@ensforge/react/atoms";

const atom = getInterfaceAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getInterface`](/core/api/actions/records/get-interface)
- [`sdk.records.getInterface`](/sdk/api/records/get-interface)
