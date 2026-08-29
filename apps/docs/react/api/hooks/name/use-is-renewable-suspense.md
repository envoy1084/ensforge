---
title: useIsRenewableSuspense
description: Suspense hook for checking whether the name is renewable.
---

# useIsRenewableSuspense

Suspense hook for checking whether the name is renewable.

## Import

```tsx
import { useIsRenewableSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useIsRenewableSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useIsRenewableSuspense>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useIsRenewableSuspense>;
```

## Effect Atom

```ts
import { isRenewableAtom } from "@ensforge/react/atoms";

const atom = isRenewableAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`isRenewable`](/core/api/actions/name/is-renewable)
- [`sdk.name.isRenewable`](/sdk/api/name/is-renewable)
