---
title: useTexts
description: Hook for fetching texts.
---

# useTexts

Hook for fetching texts.

## Import

```tsx
import { useTexts } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useTexts({
    name: "example.eth",
    keys: ["url"],
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useTexts>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useTexts>;
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
