---
title: useTransferSubname
description: Hook for transferring subname.
---

# useTransferSubname

Hook for transferring subname.

## Import

```tsx
import { useTransferSubname } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useTransferSubname();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          to: "value",
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
type Parameters = Parameters<typeof useTransferSubname>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### to

`string`

Value used for `to` by this operation.

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

### name

`string`

ENS name used by the query or mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useTransferSubname>;
```

## Effect Atom

```ts
import { createTransferSubnameMutationAtom } from "@ensforge/react/atoms";

const atom = createTransferSubnameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`transferSubname`](/core/api/actions/subnames/transfer-subname)
- [`sdk.subnames.transferSubname`](/sdk/api/subnames/transfer-subname)
