---
title: useApproveName
description: Hook for approving name.
---

# useApproveName

Hook for approving name.

## Import

```tsx
import { useApproveName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useApproveName } from "@ensforge/react";

function Component() {
  const mutation = useApproveName();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          approved: true,
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
import type { ApproveNameParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useApproveName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createApproveNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createApproveNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`approveName`](/core/api/actions/permissions/approve-name)
- [`sdk.permissions.approveName`](/sdk/api/permissions/approve-name)
