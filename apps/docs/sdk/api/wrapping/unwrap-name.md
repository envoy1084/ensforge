---
title: unwrapName
description: unwrap name for wrapped names.
---

# unwrapName

unwrap name for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.wrapping.unwrapName({
  name: "example.eth",
  manager: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type UnwrapNameParameters = Parameters<typeof sdk.wrapping.unwrapName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### manager

`string`

Address that should manage the name.

### registrant

`string | undefined`

Address that should own the registrar token.

## Return Type

```ts
type UnwrapNameResult = Awaited<ReturnType<typeof sdk.wrapping.unwrapName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.wrapping.unwrapName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.wrapping.unwrapName.call(parameters);
```

## Action

- [`unwrapName`](/core/api/actions/wrapping/unwrap-name)
