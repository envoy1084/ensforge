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

```tsx
function Component() {
  const mutation = useGrantResolverRoles();

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
type Parameters = Parameters<typeof useGrantResolverRoles>[0];
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
type Result = ReturnType<typeof useGrantResolverRoles>;
```

## Effect Atom

```ts
import { createGrantResolverRolesMutationAtom } from "@ensforge/react/atoms";

const atom = createGrantResolverRolesMutationAtom(sdk);
```

The hook uses this atom with the SDK and registry from `EnsforgeProvider`.

## Action

- [`grantResolverRoles`](/core/api/actions/permissions/grant-resolver-roles)
- [`sdk.permissions.grantResolverRoles`](/sdk/api/permissions/grant-resolver-roles)
