---
title: getRegistryCapabilities
description: Gets registry capabilities for capability and authorization discovery.
---

# getRegistryCapabilities

Gets registry capabilities for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getRegistryCapabilities({
  name: "example.eth",
});
```

## Parameters

```ts
type GetRegistryCapabilitiesParameters = Parameters<
  typeof sdk.capabilities.getRegistryCapabilities
>[0];
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

## Return Type

```ts
type GetRegistryCapabilitiesResult = Awaited<
  ReturnType<typeof sdk.capabilities.getRegistryCapabilities>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getRegistryCapabilities.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getRegistryCapabilities.request(parameters);
```

## Action

- [`getRegistryCapabilities`](/core/api/actions/capabilities/get-registry-capabilities)
