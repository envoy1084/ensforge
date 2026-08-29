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

```tsx
function Component() {
  const mutation = useRevokeResolverRoles();

  return (
    <button
      disabled={mutation.isPending}
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

## Parameters

```ts
type Parameters = Parameters<typeof useRevokeResolverRoles>[0];
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

### record

`ResolverRecord`

Value used for `record` by this operation.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

## Return Type

Returns [`EnsMutationResult`](/react/api/mutation-result) with `mutate`, `mutateAsync`, `mutateEffect`, status flags, data, error, interruption, and reset.

```ts
type Result = ReturnType<typeof useRevokeResolverRoles>;
```

## Effect Atom

```ts
import { createRevokeResolverRolesMutationAtom } from "@ensforge/react/atoms";

const atom = createRevokeResolverRolesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`revokeResolverRoles`](/core/api/actions/permissions/revoke-resolver-roles)
- [`sdk.permissions.revokeResolverRoles`](/sdk/api/permissions/revoke-resolver-roles)
