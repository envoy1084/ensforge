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

```tsx
function Component() {
  const mutation = useApproveName();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useApproveName>[0];
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

### approved

`string`

Whether the target should be approved.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useApproveName>;
```

## Effect Atom

```ts
import { createApproveNameMutationAtom } from "@ensforge/react/atoms";

const atom = createApproveNameMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`approveName`](/core/api/actions/permissions/approve-name)
- [`sdk.permissions.approveName`](/sdk/api/permissions/approve-name)
