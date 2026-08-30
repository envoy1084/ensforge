---
title: useSetResolverDelegateApproval
description: Hook for setting resolver delegate approval.
---

# useSetResolverDelegateApproval

Hook for setting resolver delegate approval.

## Import

```tsx
import { useSetResolverDelegateApproval } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useSetResolverDelegateApproval();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          delegate: "0x0000000000000000000000000000000000000001",
          approved: true,
        })
      }
    >
      Submit
    </button>
  );
}
```

<!--@include: @/shared/react/mutation-options.md-->

## Mutation Parameters

### name

`string`

ENS name used by the query or mutation.

### delegate

`string`

Resolver delegate whose permissions are read or changed.

### approved

`boolean`

Whether the target should be approved.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, native `AsyncResult` state, data, cause, interruption, and reset.

```ts
type Result = ReturnType<typeof useSetResolverDelegateApproval>;
```

## Effect Atom

```ts
import { createSetResolverDelegateApprovalMutationAtom } from "@ensforge/react/atoms";

const atom = createSetResolverDelegateApprovalMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`setResolverDelegateApproval`](/core/api/actions/permissions/set-resolver-delegate-approval)
- [`sdk.permissions.setResolverDelegateApproval`](/sdk/api/permissions/set-resolver-delegate-approval)
