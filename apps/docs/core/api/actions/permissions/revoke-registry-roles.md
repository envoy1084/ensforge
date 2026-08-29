---
title: revokeRegistryRoles
description: Revokes registry roles for approvals and scoped roles.
---

# revokeRegistryRoles

Revokes registry roles for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { revokeRegistryRoles } from "@ensforge/core";
```

## Usage

```ts
import { revokeRegistryRoles } from "@ensforge/core";
import { config } from "./config";

const result = await revokeRegistryRoles(config, {
  name: "example.eth",
  account: "value",
  roles: 1n,
});
```

## Parameters

```ts
type RevokeRegistryRolesParameters = Parameters<typeof revokeRegistryRoles>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### account

`string`

Account used for authorization and wallet execution.

### roles

`bigint`

Role bitmask to read, grant, or revoke.

## Return Type

```ts
type RevokeRegistryRolesResult = Awaited<ReturnType<typeof revokeRegistryRoles>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = revokeRegistryRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = revokeRegistryRoles.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type RevokeRegistryRolesError = Effect.Effect.Error<ReturnType<typeof revokeRegistryRoles.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
