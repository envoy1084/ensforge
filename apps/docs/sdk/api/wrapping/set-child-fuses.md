---
title: setChildFuses
description: Sets child fuses for wrapped names.
---

# setChildFuses

Sets child fuses for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.wrapping.setChildFuses({
  expiry: 2_000_000_000n,
  name: "example.eth",
  fuses: [],
});
```

## Parameters

```ts
type SetChildFusesParameters = Parameters<typeof sdk.wrapping.setChildFuses>[0];
```

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this method.

## Return Type

```ts
type SetChildFusesResult = Awaited<ReturnType<typeof sdk.wrapping.setChildFuses>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.wrapping.setChildFuses.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.wrapping.setChildFuses.call(parameters);
```

## Action

- [`setChildFuses`](/core/api/actions/wrapping/set-child-fuses)
