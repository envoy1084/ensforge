---
title: useSetFuses
description: Hook for setting fuses.
---

# useSetFuses

Hook for setting fuses.

## Import

```tsx
import { useSetFuses } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetFuses();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
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
type Parameters = Parameters<typeof useSetFuses>[0];
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

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetFuses>;
```

## Effect Atom

```ts
import { createSetFusesMutationAtom } from "@ensforge/react/atoms";

const atom = createSetFusesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setFuses`](/core/api/actions/wrapping/set-fuses)
- [`sdk.wrapping.setFuses`](/sdk/api/wrapping/set-fuses)
