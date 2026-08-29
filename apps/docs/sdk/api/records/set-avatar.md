---
title: setAvatar
description: Sets avatar for resolver records.
---

# setAvatar

Sets avatar for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setAvatar({
  name: "example.eth",
  value: "https://example.com",
});
```

## Parameters

```ts
type SetAvatarParameters = Parameters<typeof sdk.records.setAvatar>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### value

`string`

Value written by the method.

## Return Type

```ts
type SetAvatarResult = Awaited<ReturnType<typeof sdk.records.setAvatar>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setAvatar.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setAvatar.call(parameters);
```

## Action

- [`setAvatar`](/core/api/actions/records/set-avatar)
