---
title: useSetPrimaryName
description: Hook for setting primary name.
---

# useSetPrimaryName

Hook for setting primary name.

## Import

```tsx
import { useSetPrimaryName } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetPrimaryName();

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
type Parameters = Parameters<typeof useSetPrimaryName>[0];
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

### verifyForward

`boolean | undefined`

Value used for `verifyForward` by this operation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetPrimaryName>;
```

## Effect Atom

```ts
import { createSetPrimaryNameMutationAtom } from "@ensforge/react/atoms";

const atom = createSetPrimaryNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setPrimaryName`](/core/api/actions/reverse/set-primary-name)
- [`sdk.reverse.setPrimaryName`](/sdk/api/reverse/set-primary-name)
