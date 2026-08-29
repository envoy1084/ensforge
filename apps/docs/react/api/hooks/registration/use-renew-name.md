---
title: useRenewName
description: Hook for renewing name.
---

# useRenewName

Hook for renewing name.

## Import

```tsx
import { useRenewName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useRenewName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          duration: 365n * 24n * 60n * 60n,
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
type Parameters = Parameters<typeof useRenewName>[0];
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

### duration

`bigint`

Duration in seconds.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this operation.

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

`RenewNameResult | undefined`

Previously returned progress used to continue the workflow.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useRenewName>;
```

## Effect Atom

```ts
import { createRenewNameMutationAtom } from "@ensforge/react/atoms";

const atom = createRenewNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`renewName`](/core/api/actions/registration/renew-name)
- [`sdk.registration.renewName`](/sdk/api/registration/renew-name)
