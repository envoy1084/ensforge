---
title: useSetSubnameResolver
description: Hook for setting subname resolver.
---

# useSetSubnameResolver

Hook for setting subname resolver.

## Import

```tsx
import { useSetSubnameResolver } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetSubnameResolver();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          resolver: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetSubnameResolver>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

### resolver

`string`

Resolver address used by the operation.

### name

`string`

ENS name used by the query or mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetSubnameResolver>;
```

## Effect Atom

```ts
import { createSetSubnameResolverMutationAtom } from "@ensforge/react/atoms";

const atom = createSetSubnameResolverMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setSubnameResolver`](/core/api/actions/subnames/set-subname-resolver)
- [`sdk.subnames.setSubnameResolver`](/sdk/api/subnames/set-subname-resolver)
