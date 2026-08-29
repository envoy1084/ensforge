---
title: useSetTtl
description: Hook for setting ttl.
---

# useSetTtl

Hook for setting ttl.

## Import

```tsx
import { useSetTtl } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetTtl();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          ttl: 300n,
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
type Parameters = Parameters<typeof useSetTtl>[0];
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

### ttl

`bigint`

Registry time-to-live in seconds.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetTtl>;
```

## Effect Atom

```ts
import { createSetTtlMutationAtom } from "@ensforge/react/atoms";

const atom = createSetTtlMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setTtl`](/core/api/actions/ownership/set-ttl)
- [`sdk.ownership.setTtl`](/sdk/api/ownership/set-ttl)
