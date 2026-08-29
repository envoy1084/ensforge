---
title: grantResolverRootRoles
description: Grants resolver root roles for approvals and roles.
---

# grantResolverRootRoles

Grants resolver root roles for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.grantResolverRootRoles({
  name: "example.eth",
  account: "value",
  roles: 1n,
});
```

## Parameters

```ts
type GrantResolverRootRolesParameters = Parameters<
  typeof sdk.permissions.grantResolverRootRoles
>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### account

`string`

Account used for authorization and execution.

### roles

`bigint`

Role bitmask to inspect, grant, or revoke.

## Return Type

```ts
type GrantResolverRootRolesResult = Awaited<
  ReturnType<typeof sdk.permissions.grantResolverRootRoles>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.grantResolverRootRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.permissions.grantResolverRootRoles.call(parameters);
```

## Action

- [`grantResolverRootRoles`](/core/api/actions/permissions/grant-resolver-root-roles)
