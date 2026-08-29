---
title: setData
description: Sets data for resolver records.
---

# setData

Sets data for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setData({
  name: "example.eth",
  key: "url",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetDataParameters = Parameters<typeof sdk.records.setData>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### key

`string`

Record key.

### value

`Hex`

Value written by the method.

## Return Type

```ts
type SetDataResult = Awaited<ReturnType<typeof sdk.records.setData>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setData.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setData.call(parameters);
```

## Action

- [`setData`](/core/api/actions/records/set-data)
