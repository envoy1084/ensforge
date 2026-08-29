---
title: useCommitmentStatus
description: Hook for fetching commitment status.
---

# useCommitmentStatus

Hook for fetching commitment status.

## Import

```tsx
import { useCommitmentStatus } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useCommitmentStatus({
    commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useCommitmentStatus>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useCommitmentStatus>;
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
