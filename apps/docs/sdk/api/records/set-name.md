---
title: setName
description: Sets name for resolver records.
---

# setName

Sets name for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setName({
  name: "example.eth",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetNameParameters = Parameters<typeof sdk.records.setName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### value

`string`

Value written by the method.

## Return Type

```ts
type SetNameResult = Awaited<ReturnType<typeof sdk.records.setName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setName.call(parameters);
```

## Action

- [`setName`](/core/api/actions/records/set-name)
