---
title: useApproveMigration
description: Hook for approving migration.
---

# useApproveMigration

Hook for approving migration.

## Import

```tsx
import { useApproveMigration } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useApproveMigration();

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
type Parameters = Parameters<typeof useApproveMigration>[0];
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

`boolean | undefined`

Whether the target should be approved.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useApproveMigration>;
```

## Effect Atom

```ts
import { createApproveMigrationMutationAtom } from "@ensforge/react/atoms";

const atom = createApproveMigrationMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`approveMigration`](/core/api/actions/migration/approve-migration)
- [`sdk.migration.approveMigration`](/sdk/api/migration/approve-migration)
