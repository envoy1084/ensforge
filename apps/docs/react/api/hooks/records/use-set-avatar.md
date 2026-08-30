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

::: code-group

```tsx [component.tsx]
import { useSetAvatar } from "@ensforge/react";

function Component() {
  const mutation = useSetAvatar();

  return (
    <button
      disabled={mutation.isWaiting}
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

<<< @/snippets/react/provider.tsx

:::

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

```ts
import type { SetAvatarParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetAvatar>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetAvatarMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetAvatarMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setAvatar`](/core/api/actions/records/set-avatar)
- [`sdk.records.setAvatar`](/sdk/api/records/set-avatar)
