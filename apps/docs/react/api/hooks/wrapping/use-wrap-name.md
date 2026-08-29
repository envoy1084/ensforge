---
title: useWrapName
description: Hook for wrapping name.
---

# useWrapName

Hook for wrapping name.

## Import

```tsx
import { useWrapName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useWrapName();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          owner: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useWrapName>[0];
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

`string`

Address that should own the name or resource.

### resolver

`string | undefined`

Resolver address used by the operation.

### fuses

`number | ReadonlyArray<NameWrapperFuseName> | undefined`

Value used for `fuses` by this operation.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`WrapNameResult | undefined`

Previously returned progress used to continue the workflow.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useWrapName>;
```

## Effect Atom

```ts
import { createWrapNameMutationAtom } from "@ensforge/react/atoms";

const atom = createWrapNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`wrapName`](/core/api/actions/wrapping/wrap-name)
- [`sdk.wrapping.wrapName`](/sdk/api/wrapping/wrap-name)
