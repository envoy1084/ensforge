---
title: setInterface
description: Sets interface for resolver records.
---

# setInterface

Sets interface for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setInterface({
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
  implementer: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetInterfaceParameters = Parameters<typeof sdk.records.setInterface>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### implementer

`string`

Interface implementer address.

## Return Type

```ts
type SetInterfaceResult = Awaited<ReturnType<typeof sdk.records.setInterface>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setInterface.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setInterface.call(parameters);
```

## Action

- [`setInterface`](/core/api/actions/records/set-interface)
