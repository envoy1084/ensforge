---
title: useSetChildFuses
description: Hook for setting child fuses.
---

# useSetChildFuses

Hook for setting child fuses.

## Import

```tsx
import { useSetChildFuses } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetChildFuses();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          expiry: 2_000_000_000n,
          name: "example.eth",
          fuses: [],
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
type Parameters = Parameters<typeof useSetChildFuses>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name used by the query or mutation.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetChildFuses>;
```

## Effect Atom

```ts
import { createSetChildFusesMutationAtom } from "@ensforge/react/atoms";

const atom = createSetChildFusesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setChildFuses`](/core/api/actions/wrapping/set-child-fuses)
- [`sdk.wrapping.setChildFuses`](/sdk/api/wrapping/set-child-fuses)
