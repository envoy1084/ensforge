---
title: useCompleteRegistration
description: Hook for completing registration.
---

# useCompleteRegistration

Hook for completing registration.

## Import

```tsx
import { useCompleteRegistration } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useCompleteRegistration();

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
type Parameters = Parameters<typeof useCompleteRegistration>[0];
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

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written.

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

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useCompleteRegistration>;
```

## Effect Atom

```ts
import { createCompleteRegistrationMutationAtom } from "@ensforge/react/atoms";

const atom = createCompleteRegistrationMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`completeRegistration`](/core/api/actions/registration/complete-registration)
- [`sdk.registration.completeRegistration`](/sdk/api/registration/complete-registration)
