---
title: useMigrationPlanSuspense
description: Suspense hook for fetching migration plan.
---

# useMigrationPlanSuspense

Suspense hook for fetching migration plan.

## Import

```tsx
import { useMigrationPlanSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useMigrationPlanSuspense } from "@ensforge/react";

function Component() {
  const result = useMigrationPlanSuspense({
    name: "example.eth",
    account: {},
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { GetMigrationPlanParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
```

### name

`string`

ENS name used by the operation. ensforge normalizes it before creating the query key or interacting with a contract.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used to authorize the mutation. Defaults to the active wallet account.

### owner

`EthereumAddress | undefined`

Address that should own the name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this operation.

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useMigrationPlanSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getMigrationPlanAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getMigrationPlanAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getMigrationPlan`](/core/api/actions/migration/get-migration-plan)
- [`sdk.migration.getMigrationPlan`](/sdk/api/migration/get-migration-plan)
