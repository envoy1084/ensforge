---
title: useSetOperatorApproval
description: Hook for setting operator approval.
---

# useSetOperatorApproval

Hook for setting operator approval.

## Import

```tsx
import { useSetOperatorApproval } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetOperatorApproval } from "@ensforge/react";

function Component() {
  const mutation = useSetOperatorApproval();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          target: "0x0000000000000000000000000000000000000001",
          operator: "0x0000000000000000000000000000000000000001",
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
import type { SetOperatorApprovalParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetOperatorApproval>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetOperatorApprovalMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetOperatorApprovalMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setOperatorApproval`](/core/api/actions/permissions/set-operator-approval)
- [`sdk.permissions.setOperatorApproval`](/sdk/api/permissions/set-operator-approval)
