---
title: useSetRecordPermissions
description: Hook for setting record permissions.
---

# useSetRecordPermissions

Hook for setting record permissions.

## Import

```tsx
import { useSetRecordPermissions } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetRecordPermissions();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          account: "value",
          records: [],
          approved: true,
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
type Parameters = Parameters<typeof useSetRecordPermissions>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### name

`string`

ENS name used by the query or mutation.

### account

`string`

Account used for authorization and execution.

### records

`ReadonlyArray<RecordOperation>`

Records selected, read, or written.

### approved

`boolean`

Whether the target should be approved.

### allowScopeWidening

`boolean | undefined`

Value used for `allowScopeWidening` by this operation.

### walletClient

`WalletClient | undefined`

Wallet client override.

### walletAccount

`Account | Address | undefined`

Value used for `walletAccount` by this operation.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### atomicity

`WriteAtomicity | undefined`

Value used for `atomicity` by this operation.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Value used for `capabilities` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetRecordPermissions>;
```

## Effect Atom

```ts
import { createSetRecordPermissionsMutationAtom } from "@ensforge/react/atoms";

const atom = createSetRecordPermissionsMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setRecordPermissions`](/core/api/actions/permissions/set-record-permissions)
- [`sdk.permissions.setRecordPermissions`](/sdk/api/permissions/set-record-permissions)
