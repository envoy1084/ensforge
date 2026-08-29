---
title: setSubnameResolver
description: Sets subname resolver for subname management.
---

# setSubnameResolver

Sets subname resolver for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.subnames.setSubnameResolver({
  resolver: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetSubnameResolverParameters = Parameters<typeof sdk.subnames.setSubnameResolver>[0];
```

### resolver

`string`

Resolver address used by the method.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type SetSubnameResolverResult = Awaited<ReturnType<typeof sdk.subnames.setSubnameResolver>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.subnames.setSubnameResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.subnames.setSubnameResolver.call(parameters);
```

## Action

- [`setSubnameResolver`](/core/api/actions/subnames/set-subname-resolver)
