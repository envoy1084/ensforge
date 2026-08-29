---
title: useMigrateNames
description: Hook for migrating names.
---

# useMigrateNames

Hook for migrating names.

## Import

```tsx
import { useMigrateNames } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useMigrateNames();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          migrations: [],
        })
      }
    >
      Submit
    </button>
  );
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useMigrateNames>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### migrations

`ReadonlyArray<MigrateNameCallParameters>`

Migration entries.

### resume

`MigrationBatchProgress | undefined`

Previously returned progress used to continue the workflow.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useMigrateNames>;
```

## Effect Atom

```ts
import { createMigrateNamesMutationAtom } from "@ensforge/react/atoms";

const atom = createMigrateNamesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`migrateNames`](/core/api/actions/migration/migrate-names)
- [`sdk.migration.migrateNames`](/sdk/api/migration/migrate-names)
