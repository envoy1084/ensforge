---
title: useDnsClaimStatusSuspense
description: Suspense hook for fetching dns claim status.
---

# useDnsClaimStatusSuspense

Suspense hook for fetching dns claim status.

## Import

```tsx
import { useDnsClaimStatusSuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDnsClaimStatusSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsClaimStatusSuspense>[0];
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
type Result = ReturnType<typeof useDnsClaimStatusSuspense>;
```

## Effect Atom

```ts
import { getDnsClaimStatusAtom } from "@ensforge/react/atoms";

const atom = getDnsClaimStatusAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getDnsClaimStatus`](/core/api/actions/dns/get-dns-claim-status)
- [`sdk.dns.getDnsClaimStatus`](/sdk/api/dns/get-dns-claim-status)
