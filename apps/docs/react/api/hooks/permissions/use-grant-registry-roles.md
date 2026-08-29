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

```tsx
function Component() {
  const mutation = useGrantRegistryRoles();

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
type Parameters = Parameters<typeof useGrantRegistryRoles>[0];
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
type Result = ReturnType<typeof useGrantRegistryRoles>;
```

## Effect Atom

```ts
import { createGrantRegistryRolesMutationAtom } from "@ensforge/react/atoms";

const atom = createGrantRegistryRolesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`grantRegistryRoles`](/core/api/actions/permissions/grant-registry-roles)
- [`sdk.permissions.grantRegistryRoles`](/sdk/api/permissions/grant-registry-roles)
