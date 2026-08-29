---
title: grantResolverRoles
description: Grants resolver roles for approvals and scoped roles.
---

# grantResolverRoles

Grants resolver roles for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { grantResolverRoles } from "@ensforge/core";
```

## Usage

```ts
import { grantResolverRoles } from "@ensforge/core";
import { config } from "./config";

const result = await grantResolverRoles(config, {
  name: "example.eth",
  account: "value",
  record: {},
});
```

## Parameters

```ts
type GrantResolverRolesParameters = Parameters<typeof grantResolverRoles>[1];
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
type GrantResolverRolesResult = Awaited<ReturnType<typeof grantResolverRoles>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = grantResolverRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = grantResolverRoles.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GrantResolverRolesError = Effect.Effect.Error<ReturnType<typeof grantResolverRoles.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
