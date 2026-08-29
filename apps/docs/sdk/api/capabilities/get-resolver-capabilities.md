---
title: getResolverCapabilities
description: Gets resolver capabilities for capability and authorization discovery.
---

# getResolverCapabilities

Gets resolver capabilities for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getResolverCapabilities({
  name: "example.eth",
});
```

## Parameters

```ts
type GetResolverCapabilitiesParameters = Parameters<
  typeof sdk.capabilities.getResolverCapabilities
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
type GetResolverCapabilitiesResult = Awaited<
  ReturnType<typeof sdk.capabilities.getResolverCapabilities>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getResolverCapabilities.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getResolverCapabilities.request(parameters);
```

## Action

- [`getResolverCapabilities`](/core/api/actions/capabilities/get-resolver-capabilities)
