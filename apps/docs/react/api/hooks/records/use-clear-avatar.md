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

::: code-group

```tsx [component.tsx]
import { useClearAvatar } from "@ensforge/react";

function Component() {
  const mutation = useClearAvatar();

  return (
    <button
      disabled={mutation.isWaiting}
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

<<< @/snippets/react/provider.tsx

:::

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

```ts
import type { ClearAvatarParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useClearAvatar>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createClearAvatarMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createClearAvatarMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`clearAvatar`](/core/api/actions/records/clear-avatar)
- [`sdk.records.clearAvatar`](/sdk/api/records/clear-avatar)
