---
title: useSetRecords
description: Hook for setting records.
---

# useSetRecords

Hook for setting records.

## Import

```tsx
import { useSetRecords } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetRecords();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          records: [],
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
type Parameters = Parameters<typeof useSetRecords>[0];
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

### records

`ReadonlyArray<SetRecordInput>`

Records selected, read, or written.

### aggregation

`"auto" | "resolver" | "wallet" | undefined`

Value used for `aggregation` by this operation.

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

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetRecords>;
```

## Effect Atom

```ts
import { createSetRecordsMutationAtom } from "@ensforge/react/atoms";

const atom = createSetRecordsMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setRecords`](/core/api/actions/records/set-records)
- [`sdk.records.setRecords`](/sdk/api/records/set-records)
