---
title: grantResolverRootRoles
description: Grants resolver root roles for approvals and scoped roles.
---

# grantResolverRootRoles

Grants resolver root roles for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { grantResolverRootRoles } from "@ensforge/core";
```

## Usage

```ts
import { grantResolverRootRoles } from "@ensforge/core";
import { config } from "./config";

const result = await grantResolverRootRoles(config, {
  name: "example.eth",
  account: "value",
  roles: 1n,
});
```

## Parameters

```ts
type GrantResolverRootRolesParameters = Parameters<typeof grantResolverRootRoles>[1];
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
type GrantResolverRootRolesResult = Awaited<ReturnType<typeof grantResolverRootRoles>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = grantResolverRootRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = grantResolverRootRoles.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GrantResolverRootRolesError = Effect.Effect.Error<
  ReturnType<typeof grantResolverRootRoles.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
