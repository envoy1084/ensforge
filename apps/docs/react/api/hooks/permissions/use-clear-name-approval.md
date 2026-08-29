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

```tsx
function Component() {
  const mutation = useClearNameApproval();

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
type Parameters = Parameters<typeof useClearNameApproval>[0];
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
type Result = ReturnType<typeof useClearNameApproval>;
```

## Effect Atom

```ts
import { createClearNameApprovalMutationAtom } from "@ensforge/react/atoms";

const atom = createClearNameApprovalMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`clearNameApproval`](/core/api/actions/permissions/clear-name-approval)
- [`sdk.permissions.clearNameApproval`](/sdk/api/permissions/clear-name-approval)
