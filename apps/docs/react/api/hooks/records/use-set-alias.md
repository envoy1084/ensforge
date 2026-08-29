---
title: useSetAlias
description: Hook for setting alias.
---

# useSetAlias

Hook for setting alias.

## Import

```tsx
import { useSetAlias } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetAlias();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          target: "0x0000000000000000000000000000000000000001",
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
type Parameters = Parameters<typeof useSetAlias>[0];
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

### target

`string | null`

Target account or approval kind.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetAlias>;
```

## Effect Atom

```ts
import { createSetAliasMutationAtom } from "@ensforge/react/atoms";

const atom = createSetAliasMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setAlias`](/core/api/actions/records/set-alias)
- [`sdk.records.setAlias`](/sdk/api/records/set-alias)
