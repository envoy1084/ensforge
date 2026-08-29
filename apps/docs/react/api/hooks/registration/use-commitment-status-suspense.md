---
title: useCommitmentStatusSuspense
description: Suspense hook for fetching commitment status.
---

# useCommitmentStatusSuspense

Suspense hook for fetching commitment status.

## Import

```tsx
import { useCommitmentStatusSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useCommitmentStatusSuspense({
    commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useCommitmentStatusSuspense>[0];
```

### commitment

`Bytes32`

Registration commitment.

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
type Result = ReturnType<typeof useCommitmentStatusSuspense>;
```

## Effect Atom

```ts
import { getCommitmentStatusAtom } from "@ensforge/react/atoms";

const atom = getCommitmentStatusAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getCommitmentStatus`](/core/api/actions/registration/get-commitment-status)
- [`sdk.registration.getCommitmentStatus`](/sdk/api/registration/get-commitment-status)
