---
title: useMigrationEligibility
description: Hook for fetching migration eligibility.
---

# useMigrationEligibility

Hook for fetching migration eligibility.

## Import

```tsx
import { useMigrationEligibility } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const result = useMigrationEligibility({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useMigrationEligibility>[0];
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

Controls execution, freshness, retries, polling, garbage collection, and selection. See [Query Options](/react/api/query-options).

## Return Type

Returns [`EnsQueryResult`](/react/api/query-result) with typed data, failure, status flags, `AsyncResult`, and Promise or Effect refetch controls.

```ts
type Result = ReturnType<typeof useMigrationEligibility>;
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
