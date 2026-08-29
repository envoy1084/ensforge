---
title: setPrimaryName
description: Sets primary name for reverse resolution.
---

# setPrimaryName

Sets primary name for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.reverse.setPrimaryName({
  name: "example.eth",
});
```

## Parameters

```ts
type SetPrimaryNameParameters = Parameters<typeof sdk.reverse.setPrimaryName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### verifyForward

`boolean | undefined`

Value used for `verifyForward` by this method.

## Return Type

```ts
type SetPrimaryNameResult = Awaited<ReturnType<typeof sdk.reverse.setPrimaryName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.reverse.setPrimaryName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.reverse.setPrimaryName.call(parameters);
```

## Action

- [`setPrimaryName`](/core/api/actions/reverse/set-primary-name)
