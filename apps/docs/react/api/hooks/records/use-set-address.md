---
title: useSetAddress
description: Hook for setting address.
---

# useSetAddress

Hook for setting address.

## Import

```tsx
import { useSetAddress } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetAddress();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          address: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetAddress>[0];
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

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### address

`string`

Address used by the operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetAddress>;
```

## Effect Atom

```ts
import { createSetAddressMutationAtom } from "@ensforge/react/atoms";

const atom = createSetAddressMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setAddress`](/core/api/actions/records/set-address)
- [`sdk.records.setAddress`](/sdk/api/records/set-address)
