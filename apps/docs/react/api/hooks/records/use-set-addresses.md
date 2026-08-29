---
title: useSetAddresses
description: Hook for setting addresses.
---

# useSetAddresses

Hook for setting addresses.

## Import

```tsx
import { useSetAddresses } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetAddresses();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          addresses: [],
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
type Parameters = Parameters<typeof useSetAddresses>[0];
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

### addresses

`ReadonlyArray<AddressRecordInput>`

Value used for `addresses` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetAddresses>;
```

## Effect Atom

```ts
import { createSetAddressesMutationAtom } from "@ensforge/react/atoms";

const atom = createSetAddressesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setAddresses`](/core/api/actions/records/set-addresses)
- [`sdk.records.setAddresses`](/sdk/api/records/set-addresses)
