---
title: revokeRegistryRoles
description: Revokes registry roles for approvals and roles.
---

# revokeRegistryRoles

Revokes registry roles for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.revokeRegistryRoles({
  name: "example.eth",
  account: "value",
  roles: 1n,
});
```

## Parameters

```ts
type RevokeRegistryRolesParameters = Parameters<typeof sdk.permissions.revokeRegistryRoles>[0];
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
type RevokeRegistryRolesResult = Awaited<ReturnType<typeof sdk.permissions.revokeRegistryRoles>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.revokeRegistryRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.permissions.revokeRegistryRoles.call(parameters);
```

## Action

- [`revokeRegistryRoles`](/core/api/actions/permissions/revoke-registry-roles)
