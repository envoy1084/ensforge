---
title: useCreateResolver
description: Hook for creating resolver.
---

# useCreateResolver

Hook for creating resolver.

## Import

```tsx
import { useCreateResolver } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useCreateResolver();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          salt: 1n,
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
type Parameters = Parameters<typeof useCreateResolver>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### salt

`bigint`

Value used for `salt` by this operation.

### admin

`string | undefined`

Value used for `admin` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### setters

`ReadonlyArray<Hex> | undefined`

Value used for `setters` by this operation.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useCreateResolver>;
```

## Effect Atom

```ts
import { createCreateResolverMutationAtom } from "@ensforge/react/atoms";

const atom = createCreateResolverMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`createResolver`](/core/api/actions/resolution/create-resolver)
- [`sdk.resolution.createResolver`](/sdk/api/resolution/create-resolver)
