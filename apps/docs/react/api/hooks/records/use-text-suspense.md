---
title: useTextSuspense
description: Suspense hook for fetching text.
---

# useTextSuspense

Suspense hook for fetching text.

## Import

```tsx
import { useTextSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useTextSuspense({
    name: "example.eth",
    key: "url",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useTextSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### key

`string`

Record key.

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
type Result = ReturnType<typeof useTextSuspense>;
```

## Effect Atom

```ts
import { getTextAtom } from "@ensforge/react/atoms";

const atom = getTextAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getText`](/core/api/actions/records/get-text)
- [`sdk.records.getText`](/sdk/api/records/get-text)
