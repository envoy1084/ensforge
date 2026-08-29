---
title: useMigrateName
description: Hook for migrating name.
---

# useMigrateName

Hook for migrating name.

## Import

```tsx
import { useMigrateName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useMigrateName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
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
type Parameters = Parameters<typeof useMigrateName>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### migrateParent

`boolean | undefined`

Value used for `migrateParent` by this operation.

### resume

`MigrationNameProgress | undefined`

Previously returned progress used to continue the workflow.

### name

`string`

ENS name used by the query or mutation.

### owner

`EthereumAddress | undefined`

Address that should own the name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this operation.

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
type Result = ReturnType<typeof useMigrateName>;
```

## Effect Atom

```ts
import { createMigrateNameMutationAtom } from "@ensforge/react/atoms";

const atom = createMigrateNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`migrateName`](/core/api/actions/migration/migrate-name)
- [`sdk.migration.migrateName`](/sdk/api/migration/migrate-name)
