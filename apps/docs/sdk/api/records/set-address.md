---
title: setAddress
description: Sets address for resolver records.
---

# setAddress

Sets address for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setAddress({
  name: "example.eth",
  address: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type SetAddressParameters = Parameters<typeof sdk.records.setAddress>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### address

`string`

Address used by the method.

## Return Type

```ts
type SetAddressResult = Awaited<ReturnType<typeof sdk.records.setAddress>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setAddress.call(parameters);
```

## Action

- [`setAddress`](/core/api/actions/records/set-address)
