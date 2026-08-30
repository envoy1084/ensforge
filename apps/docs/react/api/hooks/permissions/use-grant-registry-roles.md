---
title: useGrantRegistryRoles
description: Hook for granting registry roles.
---

# useGrantRegistryRoles

Hook for granting registry roles.

## Import

```tsx
import { useGrantRegistryRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useGrantRegistryRoles } from "@ensforge/react";

function Component() {
  const mutation = useGrantRegistryRoles();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          account: "value",
          roles: 1n,
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
import type { RegistryRolesMutationParameters } from "@ensforge/sdk/permissions";
```

## Return Type

```ts
type Result = ReturnType<typeof useGrantRegistryRoles>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createGrantRegistryRolesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createGrantRegistryRolesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`grantRegistryRoles`](/core/api/actions/permissions/grant-registry-roles)
- [`sdk.permissions.grantRegistryRoles`](/sdk/api/permissions/grant-registry-roles)
