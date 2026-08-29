---
title: useText
description: Hook for fetching text.
---

# useText

Hook for fetching text.

## Import

```tsx
import { useText } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useText({
    name: "example.eth",
    key: "url",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useText>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useText>;
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
