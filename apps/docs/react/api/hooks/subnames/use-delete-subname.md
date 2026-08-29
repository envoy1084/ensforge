---
title: useDeleteSubname
description: Hook for deleting subname.
---

# useDeleteSubname

Hook for deleting subname.

## Import

```tsx
import { useDeleteSubname } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useDeleteSubname();

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
type Parameters = Parameters<typeof useDeleteSubname>[0];
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

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useDeleteSubname>;
```

## Effect Atom

```ts
import { createDeleteSubnameMutationAtom } from "@ensforge/react/atoms";

const atom = createDeleteSubnameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`deleteSubname`](/core/api/actions/subnames/delete-subname)
- [`sdk.subnames.deleteSubname`](/sdk/api/subnames/delete-subname)
