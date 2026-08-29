---
title: useUnwrapName
description: Hook for unwrapping name.
---

# useUnwrapName

Hook for unwrapping name.

## Import

```tsx
import { useUnwrapName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useUnwrapName();

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
type Parameters = Parameters<typeof useUnwrapName>[0];
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

### registrant

`string | undefined`

Address that should own the registrar token.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useUnwrapName>;
```

## Effect Atom

```ts
import { createUnwrapNameMutationAtom } from "@ensforge/react/atoms";

const atom = createUnwrapNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`unwrapName`](/core/api/actions/wrapping/unwrap-name)
- [`sdk.wrapping.unwrapName`](/sdk/api/wrapping/unwrap-name)
