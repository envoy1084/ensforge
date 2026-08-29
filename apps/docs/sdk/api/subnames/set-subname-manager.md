---
title: setSubnameManager
description: Sets subname manager for subname management.
---

# setSubnameManager

Sets subname manager for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.subnames.setSubnameManager({
  manager: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetSubnameManagerParameters = Parameters<typeof sdk.subnames.setSubnameManager>[0];
```

### manager

`string`

Address that should manage the name.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type SetSubnameManagerResult = Awaited<ReturnType<typeof sdk.subnames.setSubnameManager>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.subnames.setSubnameManager.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.subnames.setSubnameManager.call(parameters);
```

## Action

- [`setSubnameManager`](/core/api/actions/subnames/set-subname-manager)
