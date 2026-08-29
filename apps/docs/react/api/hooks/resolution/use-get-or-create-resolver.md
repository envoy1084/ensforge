---
title: useGetOrCreateResolver
description: Hook for fetching or create resolver.
---

# useGetOrCreateResolver

Hook for fetching or create resolver.

## Import

```tsx
import { useGetOrCreateResolver } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useGetOrCreateResolver();

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
type Parameters = Parameters<typeof useGetOrCreateResolver>[0];
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

### salt

`bigint | undefined`

Value used for `salt` by this operation.

### admin

`string | undefined`

Value used for `admin` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

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
type Result = ReturnType<typeof useGetOrCreateResolver>;
```

## Effect Atom

```ts
import { createGetOrCreateResolverMutationAtom } from "@ensforge/react/atoms";

const atom = createGetOrCreateResolverMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`getOrCreateResolver`](/core/api/actions/resolution/get-or-create-resolver)
- [`sdk.resolution.getOrCreateResolver`](/sdk/api/resolution/get-or-create-resolver)
