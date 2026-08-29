---
title: useReclaimName
description: Hook for reclaiming name.
---

# useReclaimName

Hook for reclaiming name.

## Import

```tsx
import { useReclaimName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useReclaimName();

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
type Parameters = Parameters<typeof useReclaimName>[0];
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
type Result = ReturnType<typeof useReclaimName>;
```

## Effect Atom

```ts
import { createReclaimNameMutationAtom } from "@ensforge/react/atoms";

const atom = createReclaimNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`reclaimName`](/core/api/actions/ownership/reclaim-name)
- [`sdk.ownership.reclaimName`](/sdk/api/ownership/reclaim-name)
