---
title: useUpgradeResolver
description: Hook for upgrading resolver.
---

# useUpgradeResolver

Hook for upgrading resolver.

## Import

```tsx
import { useUpgradeResolver } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useUpgradeResolver();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
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
type Parameters = Parameters<typeof useUpgradeResolver>[0];
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

### implementation

`string | undefined`

Value used for `implementation` by this operation.

### data

`Hex | undefined`

Raw calldata or record bytes.

### force

`boolean | undefined`

Value used for `force` by this operation.

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
type Result = ReturnType<typeof useUpgradeResolver>;
```

## Effect Atom

```ts
import { createUpgradeResolverMutationAtom } from "@ensforge/react/atoms";

const atom = createUpgradeResolverMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`upgradeResolver`](/core/api/actions/resolution/upgrade-resolver)
- [`sdk.resolution.upgradeResolver`](/sdk/api/resolution/upgrade-resolver)
