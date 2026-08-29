---
title: clearAvatar
description: Clears avatar for resolver records.
---

# clearAvatar

Clears avatar for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.clearAvatar({
  name: "example.eth",
});
```

## Parameters

```ts
type ClearAvatarParameters = Parameters<typeof sdk.records.clearAvatar>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type ClearAvatarResult = Awaited<ReturnType<typeof sdk.records.clearAvatar>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.clearAvatar.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.clearAvatar.call(parameters);
```

## Action

- [`clearAvatar`](/core/api/actions/records/clear-avatar)
