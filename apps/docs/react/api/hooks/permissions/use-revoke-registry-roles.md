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

```tsx
function Component() {
  const mutation = useRevokeRegistryRoles();

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
type Parameters = Parameters<typeof useRevokeRegistryRoles>[0];
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
type Result = ReturnType<typeof useRevokeRegistryRoles>;
```

## Effect Atom

```ts
import { createRevokeRegistryRolesMutationAtom } from "@ensforge/react/atoms";

const atom = createRevokeRegistryRolesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`revokeRegistryRoles`](/core/api/actions/permissions/revoke-registry-roles)
- [`sdk.permissions.revokeRegistryRoles`](/sdk/api/permissions/revoke-registry-roles)
