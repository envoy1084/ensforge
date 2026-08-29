---
title: getPubkey
description: Gets pubkey for resolver records.
---

# getPubkey

Gets pubkey for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getPubkey({
  name: "example.eth",
});
```

## Parameters

```ts
type GetPubkeyParameters = Parameters<typeof sdk.records.getPubkey>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetPubkeyResult = Awaited<ReturnType<typeof sdk.records.getPubkey>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getPubkey.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getPubkey.request(parameters);
```

## Action

- [`getPubkey`](/core/api/actions/records/get-pubkey)
