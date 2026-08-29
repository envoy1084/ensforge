---
title: hasResolverRoles
description: Checks whether resolver roles for ENS permissions and contract capabilities.
---

# hasResolverRoles

Checks whether resolver roles for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { hasResolverRoles } from "@ensforge/core";
```

## Usage

```ts
import { hasResolverRoles } from "@ensforge/core";
import { config } from "./config";

const result = await hasResolverRoles(config, {
  name: "example.eth",
  account: {},
  roles: 1n,
});
```

## Parameters

```ts
type HasResolverRolesParameters = Parameters<typeof hasResolverRoles>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used for authorization and wallet execution.

### roles

`bigint`

Role bitmask to read, grant, or revoke.

### record

`ResolverRecord | undefined`

Resolver record used by this operation.

## Return Type

```ts
type HasResolverRolesResult = Awaited<ReturnType<typeof hasResolverRoles>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = hasResolverRoles.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = hasResolverRoles.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type HasResolverRolesError = Effect.Effect.Error<ReturnType<typeof hasResolverRoles.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
