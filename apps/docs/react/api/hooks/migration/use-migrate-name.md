---
title: useMigrateName
description: Hook for migrating name.
---

# useMigrateName

Hook for migrating name.

## Import

```tsx
import { useMigrateName } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useMigrateName } from "@ensforge/react";

function Component() {
  const mutation = useMigrateName();

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
import type { MigrateNameParameters } from "@ensforge/sdk/migration";
```

## Return Type

```ts
type Result = ReturnType<typeof useMigrateName>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createMigrateNameMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createMigrateNameMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`migrateName`](/core/api/actions/migration/migrate-name)
- [`sdk.migration.migrateName`](/sdk/api/migration/migrate-name)
