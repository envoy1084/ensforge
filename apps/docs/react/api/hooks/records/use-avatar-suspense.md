---
title: useAvatarSuspense
description: Suspense hook for fetching avatar.
---

# useAvatarSuspense

Suspense hook for fetching avatar.

## Import

```tsx
import { useAvatarSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useAvatarSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useAvatarSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useAvatarSuspense>;
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
