---
title: setFuses
description: Sets fuses for wrapped names.
---

# setFuses

Sets fuses for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.wrapping.setFuses({
  name: "example.eth",
  fuses: [],
});
```

## Parameters

```ts
type SetFusesParameters = Parameters<typeof sdk.wrapping.setFuses>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this method.

## Return Type

```ts
type SetFusesResult = Awaited<ReturnType<typeof sdk.wrapping.setFuses>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.wrapping.setFuses.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.wrapping.setFuses.call(parameters);
```

## Action

- [`setFuses`](/core/api/actions/wrapping/set-fuses)
