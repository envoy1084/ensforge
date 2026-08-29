---
title: getRegistryRoles
description: Gets registry roles for capability and authorization discovery.
---

# getRegistryRoles

Gets registry roles for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getRegistryRoles({
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetRegistryRolesParameters = Parameters<typeof sdk.capabilities.getRegistryRoles>[0];
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

## Return Type

```ts
type GetRegistryRolesResult = Awaited<ReturnType<typeof sdk.capabilities.getRegistryRoles>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getRegistryRoles.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getRegistryRoles.request(parameters);
```

## Action

- [`getRegistryRoles`](/core/api/actions/capabilities/get-registry-roles)
