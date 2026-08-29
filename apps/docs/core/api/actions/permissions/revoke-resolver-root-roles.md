---
title: revokeResolverRootRoles
description: Revokes resolver root roles for approvals and scoped roles.
---

# revokeResolverRootRoles

Revokes resolver root roles for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { revokeResolverRootRoles } from "@ensforge/core";
```

## Usage

```ts
import { revokeResolverRootRoles } from "@ensforge/core";
import { config } from "./config";

const result = await revokeResolverRootRoles(config, {
  name: "example.eth",
  account: "value",
  roles: 1n,
});
```

## Parameters

```ts
type RevokeResolverRootRolesParameters = Parameters<typeof revokeResolverRootRoles>[1];
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
type RevokeResolverRootRolesResult = Awaited<ReturnType<typeof revokeResolverRootRoles>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = revokeResolverRootRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = revokeResolverRootRoles.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type RevokeResolverRootRolesError = Effect.Effect.Error<
  ReturnType<typeof revokeResolverRootRoles.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
