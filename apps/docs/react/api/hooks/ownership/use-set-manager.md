---
title: useSetManager
description: Hook for setting manager.
---

# useSetManager

Hook for setting manager.

## Import

```tsx
import { useSetManager } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetManager();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          manager: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetManager>[0];
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

### manager

`string`

Address that should manage the name.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetManager>;
```

## Effect Atom

```ts
import { createSetManagerMutationAtom } from "@ensforge/react/atoms";

const atom = createSetManagerMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setManager`](/core/api/actions/ownership/set-manager)
- [`sdk.ownership.setManager`](/sdk/api/ownership/set-manager)
