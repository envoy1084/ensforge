---
title: setPubkey
description: Sets pubkey for resolver records.
---

# setPubkey

Sets pubkey for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.setPubkey({
  name: "example.eth",
  x: "0x0000000000000000000000000000000000000000000000000000000000000001",
  y: "0x0000000000000000000000000000000000000000000000000000000000000002",
});
```

## Parameters

```ts
type SetPubkeyParameters = Parameters<typeof sdk.records.setPubkey>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### x

`Hex`

Public key X coordinate.

### y

`Hex`

Public key Y coordinate.

## Return Type

```ts
type SetPubkeyResult = Awaited<ReturnType<typeof sdk.records.setPubkey>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.setPubkey.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.records.setPubkey.call(parameters);
```

## Action

- [`setPubkey`](/core/api/actions/records/set-pubkey)
