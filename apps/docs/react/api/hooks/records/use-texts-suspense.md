---
title: useTextsSuspense
description: Suspense hook for fetching texts.
---

# useTextsSuspense

Suspense hook for fetching texts.

## Import

```tsx
import { useTextsSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useTextsSuspense({
    name: "example.eth",
    keys: ["url"],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useTextsSuspense>[0];
```

### name

`string`

ENS name used by the query or mutation.

### keys

`ReadonlyArray<string>`

Record keys to read.

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
type Result = ReturnType<typeof useTextsSuspense>;
```

## Effect Atom

```ts
import { getTextsAtom } from "@ensforge/react/atoms";

const atom = getTextsAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getTexts`](/core/api/actions/records/get-texts)
- [`sdk.records.getTexts`](/sdk/api/records/get-texts)
