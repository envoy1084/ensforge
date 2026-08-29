---
title: useCanonicalResource
description: Hook for fetching canonical resource.
---

# useCanonicalResource

Hook for fetching canonical resource.

## Import

```tsx
import { useCanonicalResource } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useCanonicalResource({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useCanonicalResource>[0];
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
type Result = ReturnType<typeof useCanonicalResource>;
```

## Effect Atom

```ts
import { getCanonicalResourceAtom } from "@ensforge/react/atoms";

const atom = getCanonicalResourceAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getCanonicalResource`](/core/api/actions/name/get-canonical-resource)
- [`sdk.name.getCanonicalResource`](/sdk/api/name/get-canonical-resource)
