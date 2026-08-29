---
title: useSendCalls
description: Hook for sending calls.
---

# useSendCalls

Hook for sending calls.

## Import

```tsx
import { useSendCalls } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSendCalls();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          calls: [],
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
type Parameters = Parameters<typeof useSendCalls>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### atomicity

`WriteAtomicity | undefined`

Value used for `atomicity` by this operation.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### simulation

`"required" | "skip" | undefined`

Value used for `simulation` by this operation.

### capabilities

`Readonly<Record<string, unknown>> | undefined`

Value used for `capabilities` by this operation.

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read requests or write intents included in the operation.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSendCalls>;
```

## Effect Atom

```ts
import { createSendCallsMutationAtom } from "@ensforge/react/atoms";

const atom = createSendCallsMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`sendCalls`](/core/api/actions/batch/send-calls)
- [`sdk.batch.sendCalls`](/sdk/api/batch/send-calls)
