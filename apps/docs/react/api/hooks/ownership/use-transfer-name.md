---
title: useTransferName
description: Hook for transferring name.
---

# useTransferName

Hook for transferring name.

## Import

```tsx
import { useTransferName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useTransferName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          to: "value",
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
type Parameters = Parameters<typeof useTransferName>[0];
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

### resume

`TransferNameProgress | undefined`

Previously returned progress used to continue the workflow.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useTransferName>;
```

## Effect Atom

```ts
import { createTransferNameMutationAtom } from "@ensforge/react/atoms";

const atom = createTransferNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`transferName`](/core/api/actions/ownership/transfer-name)
- [`sdk.ownership.transferName`](/sdk/api/ownership/transfer-name)
