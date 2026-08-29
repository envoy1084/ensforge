---
title: setResolver
description: Sets resolver for resolution and resolver lifecycle.
---

# setResolver

Sets resolver for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.resolution.setResolver({
  name: "example.eth",
  resolver: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetResolverParameters = Parameters<typeof sdk.resolution.setResolver>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### resolver

`string`

Resolver address used by the method.

## Return Type

```ts
type SetResolverResult = Awaited<ReturnType<typeof sdk.resolution.setResolver>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.resolution.setResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.resolution.setResolver.call(parameters);
```

## Action

- [`setResolver`](/core/api/actions/resolution/set-resolver)
