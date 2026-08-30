---
title: useMigrationStatusSuspense
description: Suspense hook for fetching migration status.
---

# useMigrationStatusSuspense

Suspense hook for fetching migration status.

## Import

```tsx
import { useMigrationStatusSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useMigrationStatusSuspense } from "@ensforge/react";

function Component() {
  const result = useMigrationStatusSuspense({
    name: "example.eth",
  });

  return <pre>{JSON.stringify(result.data, null, 2)}</pre>;
}
```

<<< @/snippets/react/provider.tsx

:::

## Parameters

```ts
import type { MigrationNameParameters, UseEnsSuspenseAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/suspense-atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useMigrationStatusSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getMigrationStatusAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getMigrationStatusAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getMigrationStatus`](/core/api/actions/migration/get-migration-status)
- [`sdk.migration.getMigrationStatus`](/sdk/api/migration/get-migration-status)
