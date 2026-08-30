---
title: useMigrateNames
description: Hook for migrating names.
---

# useMigrateNames

Hook for migrating names.

## Import

```tsx
import { useMigrateNames } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useMigrateNames } from "@ensforge/react";

function Component() {
  const mutation = useMigrateNames();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          migrations: [],
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
import type { MigrateNamesParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useMigrateNames>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createMigrateNamesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createMigrateNamesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`migrateNames`](/core/api/actions/migration/migrate-names)
- [`sdk.migration.migrateNames`](/sdk/api/migration/migrate-names)
