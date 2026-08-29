---
title: getResolver
description: Gets resolver for resolution and resolver lifecycle.
---

# getResolver

Gets resolver for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.getResolver({
  name: "example.eth",
});
```

## Parameters

```ts
type GetResolverParameters = Parameters<typeof sdk.resolution.getResolver>[0];
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
type GetResolverResult = Awaited<ReturnType<typeof sdk.resolution.getResolver>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.getResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.resolution.getResolver.request(parameters);
```

## Action

- [`getResolver`](/core/api/actions/resolution/get-resolver)
