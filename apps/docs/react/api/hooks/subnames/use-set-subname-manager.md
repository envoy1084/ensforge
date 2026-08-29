---
title: useSetSubnameManager
description: Hook for setting subname manager.
---

# useSetSubnameManager

Hook for setting subname manager.

## Import

```tsx
import { useSetSubnameManager } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetSubnameManager();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          manager: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetSubnameManager>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### manager

`string`

Address that should manage the name.

### name

`string`

ENS name used by the query or mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetSubnameManager>;
```

## Effect Atom

```ts
import { createSetSubnameManagerMutationAtom } from "@ensforge/react/atoms";

const atom = createSetSubnameManagerMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setSubnameManager`](/core/api/actions/subnames/set-subname-manager)
- [`sdk.subnames.setSubnameManager`](/sdk/api/subnames/set-subname-manager)
