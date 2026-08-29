---
title: setPubkey
description: Sets pubkey for ENS resolver records.
---

# setPubkey

Sets pubkey for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setPubkey } from "@ensforge/core";
```

## Usage

```ts
import { setPubkey } from "@ensforge/core";
import { config } from "./config";

const result = await setPubkey(config, {
  name: "example.eth",
  x: "0x0000000000000000000000000000000000000000000000000000000000000001",
  y: "0x0000000000000000000000000000000000000000000000000000000000000002",
});
```

## Parameters

```ts
type SetPubkeyParameters = Parameters<typeof setPubkey>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### x

`Hex`

X coordinate of the secp256k1 public key.

### y

`Hex`

Y coordinate of the secp256k1 public key.

## Return Type

```ts
type SetPubkeyResult = Awaited<ReturnType<typeof setPubkey>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setPubkey.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setPubkey.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetPubkeyError = Effect.Effect.Error<ReturnType<typeof setPubkey.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
