---
title: useResumeCalls
description: Hook for resuming calls.
---

# useResumeCalls

Hook for resuming calls.

## Import

```tsx
import { useResumeCalls } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useResumeCalls();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          batch: {},
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
type Parameters = Parameters<typeof useResumeCalls>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### batch

`NativeBatchResult`

Value used for `batch` by this operation.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useResumeCalls>;
```

## Effect Atom

```ts
import { createResumeCallsMutationAtom } from "@ensforge/react/atoms";

const atom = createResumeCallsMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`resumeCalls`](/core/api/actions/batch/resume-calls)
- [`sdk.batch.resumeCalls`](/sdk/api/batch/resume-calls)
