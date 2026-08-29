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

```tsx
function Component() {
  const mutation = useSetOperatorApproval();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useSetOperatorApproval>[0];
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

### target

`OperatorApprovalKind`

Target account or approval kind.

### operator

`string`

Operator whose approval is read or changed.

### approved

`boolean`

Whether the target should be approved.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetOperatorApproval>;
```

## Effect Atom

```ts
import { createSetOperatorApprovalMutationAtom } from "@ensforge/react/atoms";

const atom = createSetOperatorApprovalMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setOperatorApproval`](/core/api/actions/permissions/set-operator-approval)
- [`sdk.permissions.setOperatorApproval`](/sdk/api/permissions/set-operator-approval)
