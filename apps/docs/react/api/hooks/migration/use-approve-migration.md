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

::: code-group

```tsx [component.tsx]
import { useApproveMigration } from "@ensforge/react";

function Component() {
  const mutation = useApproveMigration();

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
import type { ApproveMigrationParameters } from "@ensforge/sdk/migration";
```

## Return Type

```ts
type Result = ReturnType<typeof useApproveMigration>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createApproveMigrationMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createApproveMigrationMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`approveMigration`](/core/api/actions/migration/approve-migration)
- [`sdk.migration.approveMigration`](/sdk/api/migration/approve-migration)
