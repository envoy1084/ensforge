---
title: useDnsClaimStatus
description: Hook for fetching dns claim status.
---

# useDnsClaimStatus

Hook for fetching dns claim status.

## Import

```tsx
import { useDnsClaimStatus } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useDnsClaimStatus({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useDnsClaimStatus>[0];
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
type Result = ReturnType<typeof useDnsClaimStatus>;
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
