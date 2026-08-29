---
title: setTtl
description: Sets ttl for ownership management.
---

# setTtl

Sets ttl for ownership management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.ownership.setTtl({
  name: "example.eth",
  ttl: 300n,
});
```

## Parameters

```ts
type SetTtlParameters = Parameters<typeof sdk.ownership.setTtl>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### ttl

`bigint`

Registry time-to-live in seconds.

## Return Type

```ts
type SetTtlResult = Awaited<ReturnType<typeof sdk.ownership.setTtl>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.ownership.setTtl.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.ownership.setTtl.call(parameters);
```

## Action

- [`setTtl`](/core/api/actions/ownership/set-ttl)
