---
title: useMigrationTargetSuspense
description: Suspense hook for fetching migration target.
---

# useMigrationTargetSuspense

Suspense hook for fetching migration target.

## Import

```tsx
import { useMigrationTargetSuspense } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useMigrationTargetSuspense } from "@ensforge/react";

function Component() {
  const result = useMigrationTargetSuspense({
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
type Result = ReturnType<typeof useMigrationTargetSuspense>;
```

<!--@include: @/shared/react/suspense-atom-result.md-->

## Effect Atom

```ts
import { getMigrationTargetAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getMigrationTargetAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getMigrationTarget`](/core/api/actions/migration/get-migration-target)
- [`sdk.migration.getMigrationTarget`](/sdk/api/migration/get-migration-target)
