---
title: useClearPrimaryName
description: Hook for clearing primary name.
---

# useClearPrimaryName

Hook for clearing primary name.

## Import

```tsx
import { useClearPrimaryName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useClearPrimaryName();

  return (
    <button disabled={mutation.isPending} onClick={() => mutation.mutate({})}>
      Submit
    </button>
  );
}
```

## Parameters

```ts
type Parameters = Parameters<typeof useClearPrimaryName>[0];
```

## Hook Parameters

```ts
import type { EnsMutationOptions } from "@ensforge/react";
```

The hook accepts `retry`, `onSuccess`, `onError`, and `onSettled`. See [Mutation Options](/react/api/mutation-options).

## Mutation Parameters

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useClearPrimaryName>;
```

## Effect Atom

```ts
import { createClearPrimaryNameMutationAtom } from "@ensforge/react/atoms";

const atom = createClearPrimaryNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`clearPrimaryName`](/core/api/actions/reverse/clear-primary-name)
- [`sdk.reverse.clearPrimaryName`](/sdk/api/reverse/clear-primary-name)
