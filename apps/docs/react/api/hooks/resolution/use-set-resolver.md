---
title: useSetResolver
description: Hook for setting resolver.
---

# useSetResolver

Hook for setting resolver.

## Import

```tsx
import { useSetResolver } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetResolver();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          resolver: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetResolver>[0];
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

### resolver

`string`

Resolver address used by the operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetResolver>;
```

## Effect Atom

```ts
import { createSetResolverMutationAtom } from "@ensforge/react/atoms";

const atom = createSetResolverMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setResolver`](/core/api/actions/resolution/set-resolver)
- [`sdk.resolution.setResolver`](/sdk/api/resolution/set-resolver)
