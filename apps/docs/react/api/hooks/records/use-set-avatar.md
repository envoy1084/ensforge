---
title: useSetAvatar
description: Hook for setting avatar.
---

# useSetAvatar

Hook for setting avatar.

## Import

```tsx
import { useSetAvatar } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetAvatar();

  return (
    <button
      disabled={mutation.isPending}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          value: "https://example.com",
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
type Parameters = Parameters<typeof useSetAvatar>[0];
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

### value

`string`

Value written by the mutation.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetAvatar>;
```

## Effect Atom

```ts
import { createSetAvatarMutationAtom } from "@ensforge/react/atoms";

const atom = createSetAvatarMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setAvatar`](/core/api/actions/records/set-avatar)
- [`sdk.records.setAvatar`](/sdk/api/records/set-avatar)
