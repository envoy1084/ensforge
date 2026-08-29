---
title: useClearAvatar
description: Hook for clearing avatar.
---

# useClearAvatar

Hook for clearing avatar.

## Import

```tsx
import { useClearAvatar } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useClearAvatar();

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
type Parameters = Parameters<typeof useClearAvatar>[0];
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

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useClearAvatar>;
```

## Effect Atom

```ts
import { createClearAvatarMutationAtom } from "@ensforge/react/atoms";

const atom = createClearAvatarMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`clearAvatar`](/core/api/actions/records/clear-avatar)
- [`sdk.records.clearAvatar`](/sdk/api/records/clear-avatar)
