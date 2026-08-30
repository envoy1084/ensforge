---
title: useClearNameApproval
description: Hook for clearing name approval.
---

# useClearNameApproval

Hook for clearing name approval.

## Import

```tsx
import { useClearNameApproval } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useClearNameApproval } from "@ensforge/react";

function Component() {
  const mutation = useClearNameApproval();

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
import type { ClearNameApprovalParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useClearNameApproval>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createClearNameApprovalMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createClearNameApprovalMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`clearNameApproval`](/core/api/actions/permissions/clear-name-approval)
- [`sdk.permissions.clearNameApproval`](/sdk/api/permissions/clear-name-approval)
