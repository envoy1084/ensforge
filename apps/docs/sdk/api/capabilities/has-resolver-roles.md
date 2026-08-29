---
title: hasResolverRoles
description: Checks whether resolver roles for capability and authorization discovery.
---

# hasResolverRoles

Checks whether resolver roles for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.hasResolverRoles({
  name: "example.eth",
  account: {},
  roles: 1n,
});
```

## Parameters

```ts
type HasResolverRolesParameters = Parameters<typeof sdk.capabilities.hasResolverRoles>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### account

`EthereumAddress`

Account used for authorization and execution.

### roles

`bigint`

Role bitmask to inspect, grant, or revoke.

### record

`ResolverRecord | undefined`

Value used for `record` by this method.

## Return Type

```ts
type HasResolverRolesResult = Awaited<ReturnType<typeof sdk.capabilities.hasResolverRoles>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.hasResolverRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.hasResolverRoles.request(parameters);
```

## Action

- [`hasResolverRoles`](/core/api/actions/capabilities/has-resolver-roles)
