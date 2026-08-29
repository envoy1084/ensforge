---
title: setManager
description: Sets manager for ownership management.
---

# setManager

Sets manager for ownership management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.ownership.setManager({
  name: "example.eth",
  manager: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetManagerParameters = Parameters<typeof sdk.ownership.setManager>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### manager

`string`

Address that should manage the name.

## Return Type

```ts
type SetManagerResult = Awaited<ReturnType<typeof sdk.ownership.setManager>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.ownership.setManager.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.ownership.setManager.call(parameters);
```

## Action

- [`setManager`](/core/api/actions/ownership/set-manager)
