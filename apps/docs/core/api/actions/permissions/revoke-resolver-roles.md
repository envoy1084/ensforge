---
title: revokeResolverRoles
description: Revokes resolver roles for approvals and scoped roles.
---

# revokeResolverRoles

Revokes resolver roles for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { revokeResolverRoles } from "@ensforge/core";
```

## Usage

```ts
import { revokeResolverRoles } from "@ensforge/core";
import { config } from "./config";

const result = await revokeResolverRoles(config, {
  name: "example.eth",
  account: "value",
  record: {},
});
```

## Parameters

```ts
type RevokeResolverRolesParameters = Parameters<typeof revokeResolverRoles>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### account

`string`

Account used for authorization and wallet execution.

### record

`ResolverRecord`

Resolver record used by this operation.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

## Return Type

```ts
type RevokeResolverRolesResult = Awaited<ReturnType<typeof revokeResolverRoles>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = revokeResolverRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = revokeResolverRoles.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type RevokeResolverRolesError = Effect.Effect.Error<ReturnType<typeof revokeResolverRoles.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
