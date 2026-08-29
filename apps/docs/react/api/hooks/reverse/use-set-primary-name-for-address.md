---
title: useSetPrimaryNameForAddress
description: Hook for setting primary name for address.
---

# useSetPrimaryNameForAddress

Hook for setting primary name for address.

## Import

```tsx
import { useSetPrimaryNameForAddress } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetPrimaryNameForAddress();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          address: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetPrimaryNameForAddress>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### address

`string`

Address used by the operation.

### name

`string`

ENS name used by the query or mutation.

### verifyForward

`boolean | undefined`

Value used for `verifyForward` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetPrimaryNameForAddress>;
```

## Effect Atom

```ts
import { createSetPrimaryNameForAddressMutationAtom } from "@ensforge/react/atoms";

const atom = createSetPrimaryNameForAddressMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setPrimaryNameForAddress`](/core/api/actions/reverse/set-primary-name-for-address)
- [`sdk.reverse.setPrimaryNameForAddress`](/sdk/api/reverse/set-primary-name-for-address)
