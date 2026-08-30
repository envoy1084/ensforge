---
title: useSetRecordPermissions
description: Hook for setting record permissions.
---

# useSetRecordPermissions

Hook for setting record permissions.

## Import

```tsx
import { useSetRecordPermissions } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useSetRecordPermissions } from "@ensforge/react";

function Component() {
  const mutation = useSetRecordPermissions();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          account: "value",
          records: [],
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
import type { SetRecordPermissionsParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useSetRecordPermissions>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createSetRecordPermissionsMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createSetRecordPermissionsMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`setRecordPermissions`](/core/api/actions/permissions/set-record-permissions)
- [`sdk.permissions.setRecordPermissions`](/sdk/api/permissions/set-record-permissions)
