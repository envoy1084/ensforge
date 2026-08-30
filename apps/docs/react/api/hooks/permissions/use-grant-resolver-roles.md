---
title: useGrantResolverRoles
description: Hook for granting resolver roles.
---

# useGrantResolverRoles

Hook for granting resolver roles.

## Import

```tsx
import { useGrantResolverRoles } from "@ensforge/react";
```

## Usage

::: code-group

```tsx [component.tsx]
import { useGrantResolverRoles } from "@ensforge/react";

function Component() {
  const mutation = useGrantResolverRoles();

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
type Result = ReturnType<typeof useGrantResolverRoles>;
```

<!--@include: @/shared/react/mutation-result.md-->

## Effect Atom

```ts
import { createGrantResolverRolesMutationAtom } from "@ensforge/react/atoms";
import { sdk } from "./client";

const atom = createGrantResolverRolesMutationAtom(sdk);
```

The hook creates this atom with the SDK and registry supplied by [`EnsforgeProvider`](/react/api/ensforge-provider).

## Action

- [`grantResolverRoles`](/core/api/actions/permissions/grant-resolver-roles)
- [`sdk.permissions.grantResolverRoles`](/sdk/api/permissions/grant-resolver-roles)
