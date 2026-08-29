---
title: useMigrationEligibilitySuspense
description: Suspense hook for fetching migration eligibility.
---

# useMigrationEligibilitySuspense

Suspense hook for fetching migration eligibility.

## Import

```tsx
import { useMigrationEligibilitySuspense } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useMigrationEligibilitySuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useMigrationEligibilitySuspense>[0];
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

### account

`EthereumAddress`

Account used for authorization and execution.

### query

`EnsQueryOptions | undefined`

Controls execution, freshness, retries, polling, garbage collection, and selection. Suspense hooks always execute and do not accept `enabled`.

## Return Type

Returns successful data and refetch controls. Pending work suspends, and failures are thrown to the nearest error boundary.

```ts
type Result = ReturnType<typeof useMigrationEligibilitySuspense>;
```

## Effect Atom

```ts
import { getMigrationEligibilityAtom } from "@ensforge/react/atoms";

const atom = getMigrationEligibilityAtom(sdk, parameters, options);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getMigrationEligibility`](/core/api/actions/migration/get-migration-eligibility)
- [`sdk.migration.getMigrationEligibility`](/sdk/api/migration/get-migration-eligibility)
