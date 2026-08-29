---
title: useInterfaceSuspense
description: Suspense hook for fetching interface.
---

# useInterfaceSuspense

Suspense hook for fetching interface.

## Import

```tsx
import { useInterfaceSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useInterfaceSuspense({
    name: "example.eth",
    interfaceId: "0x01ffc9a7",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useInterfaceSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useInterfaceSuspense>;
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
