---
title: revokeResolverRoles
description: Revokes resolver roles for approvals and roles.
---

# revokeResolverRoles

Revokes resolver roles for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.revokeResolverRoles({
  name: "example.eth",
  account: "value",
  record: {},
});
```

## Parameters

```ts
type RevokeResolverRolesParameters = Parameters<typeof sdk.permissions.revokeResolverRoles>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### account

`string`

Account used for authorization and execution.

### record

`ResolverRecord`

Value used for `record` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

## Return Type

```ts
type RevokeResolverRolesResult = Awaited<ReturnType<typeof sdk.permissions.revokeResolverRoles>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.revokeResolverRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.permissions.revokeResolverRoles.call(parameters);
```

## Action

- [`revokeResolverRoles`](/core/api/actions/permissions/revoke-resolver-roles)
