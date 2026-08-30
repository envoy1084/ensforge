---
title: useRevokeRegistryRoles
description: Hook for revoking registry roles.
---

# useRevokeRegistryRoles

Hook for revoking registry roles.

## Import

```tsx
import { useRevokeRegistryRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRevokeRegistryRoles } from "@ensforge/react";

function Component() {
  const mutation = useRevokeRegistryRoles();

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
type Result = ReturnType<typeof useRevokeRegistryRoles>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createRevokeRegistryRolesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRevokeRegistryRolesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`revokeRegistryRoles`](/core/api/actions/permissions/revoke-registry-roles)
- [`sdk.permissions.revokeRegistryRoles`](/sdk/api/permissions/revoke-registry-roles)
