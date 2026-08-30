---
title: useRevokeResolverRoles
description: Hook for revoking resolver roles.
---

# useRevokeResolverRoles

Hook for revoking resolver roles.

## Import

```tsx
import { useRevokeResolverRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useRevokeResolverRoles } from "@ensforge/react";

function Component() {
  const mutation = useRevokeResolverRoles();

  return (
    <button
      disabled={mutation.isWaiting}
      onClick={() =>
        mutation.mutate({
          name: "example.eth",
          account: "value",
          record: {},
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
import type { ResolverRolesMutationParameters } from "@ensforge/sdk/permissions";
```

## Return Type

```ts
type Result = ReturnType<typeof useRevokeResolverRoles>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createRevokeResolverRolesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createRevokeResolverRolesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`revokeResolverRoles`](/core/api/actions/permissions/revoke-resolver-roles)
- [`sdk.permissions.revokeResolverRoles`](/sdk/api/permissions/revoke-resolver-roles)
