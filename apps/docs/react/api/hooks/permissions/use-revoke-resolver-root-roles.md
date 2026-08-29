---
title: useRevokeResolverRootRoles
description: Hook for revoking resolver root roles.
---

# useRevokeResolverRootRoles

Hook for revoking resolver root roles.

## Import

```tsx
import { useRevokeResolverRootRoles } from "@ensforge/react";
```

## Usage

```tsx
function Component() {
  const mutation = useRevokeResolverRootRoles();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useRevokeResolverRootRoles>[0];
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

### account

`string`

Account used for authorization and execution.

### roles

`bigint`

Role bitmask to inspect, grant, or revoke.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useRevokeResolverRootRoles>;
```

## Effect Atom

```ts
import { createRevokeResolverRootRolesMutationAtom } from "@ensforge/react/atoms";

const atom = createRevokeResolverRootRolesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`revokeResolverRootRoles`](/core/api/actions/permissions/revoke-resolver-root-roles)
- [`sdk.permissions.revokeResolverRootRoles`](/sdk/api/permissions/revoke-resolver-root-roles)
