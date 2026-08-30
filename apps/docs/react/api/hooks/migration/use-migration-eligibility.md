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

::: code-group

```tsx [component.tsx]
import { useMigrationEligibility } from "@ensforge/react";

function Component() {
  const result = useMigrationEligibility({
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
import type { GetMigrationEligibilityParameters, UseEnsAtomParameters } from "@ensforge/react";
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

<!--@include: @/shared/react/atom-parameters.md-->

## Return Type

```ts
type Result = ReturnType<typeof useMigrationEligibility>;
```

<!--@include: @/shared/react/atom-result.md-->

## Effect Atom

```ts
import { getMigrationEligibilityAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = getMigrationEligibilityAtom(sdk, parameters, options);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`getMigrationEligibility`](/core/api/actions/migration/get-migration-eligibility)
- [`sdk.migration.getMigrationEligibility`](/sdk/api/migration/get-migration-eligibility)
