---
title: useGrantResolverRootRoles
description: Hook for granting resolver root roles.
---

# useGrantResolverRootRoles

Hook for granting resolver root roles.

## Import

```tsx
import { useGrantResolverRootRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useGrantResolverRootRoles } from "@ensforge/react";

function Component() {
  const mutation = useGrantResolverRootRoles();

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
import type { ResolverRootRolesMutationParameters } from "@ensforge/react";
```

## Return Type

```ts
type Result = ReturnType<typeof useGrantResolverRootRoles>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createGrantResolverRootRolesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createGrantResolverRootRolesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`grantResolverRootRoles`](/core/api/actions/permissions/grant-resolver-root-roles)
- [`sdk.permissions.grantResolverRootRoles`](/sdk/api/permissions/grant-resolver-root-roles)
