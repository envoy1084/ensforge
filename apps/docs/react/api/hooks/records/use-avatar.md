---
title: useAvatar
description: Hook for fetching avatar.
---

# useAvatar

Hook for fetching avatar.

## Import

```tsx
import { useAvatar } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useAvatar({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useAvatar>[0];
```

### name

`string`

ENS name used by the query or mutation.

### gatewayUrls

`AssetGatewayUrls | undefined`

Value used for `gatewayUrls` by this operation.

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
type Result = ReturnType<typeof useAvatar>;
```

## Effect Atom

```ts
import { getAvatarAtom } from "@ensforge/react/atoms";

const atom = getAvatarAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getAvatar`](/core/api/actions/records/get-avatar)
- [`sdk.records.getAvatar`](/sdk/api/records/get-avatar)
