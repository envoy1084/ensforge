---
title: useRegisterName
description: Hook for registering name.
---

# useRegisterName

Hook for registering name.

## Import

```tsx
import { useRegisterName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useRegisterName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          owner: "0x0000000000000000000000000000000000000001",
          duration: 365n * 24n * 60n * 60n,
          secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useRegisterName>[0];
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

### owner

`EthereumAddress`

Address that should own the name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### duration

`bigint`

Duration in seconds.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this operation.

### secret

`Bytes32`

32-byte registration secret.

### reverseRecord

`0 | 1 | 2 | undefined`

Value used for `reverseRecord` by this operation.

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

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### records

`ReadonlyArray<SetRecordInput> | undefined`

Records selected, read, or written.

### resume

`RegisterNameResult | undefined`

Previously returned progress used to continue the workflow.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useRegisterName>;
```

## Effect Atom

```ts
import { createRegisterNameMutationAtom } from "@ensforge/react/atoms";

const atom = createRegisterNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`registerName`](/core/api/actions/registration/register-name)
- [`sdk.registration.registerName`](/sdk/api/registration/register-name)
