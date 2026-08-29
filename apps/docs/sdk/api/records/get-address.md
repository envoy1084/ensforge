---
title: getAddress
description: Gets address for resolver records.
---

# getAddress

Gets address for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getAddress({
  name: "example.eth",
});
```

## Parameters

```ts
type GetAddressParameters = Parameters<typeof sdk.records.getAddress>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n`.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAddressResult = Awaited<ReturnType<typeof sdk.records.getAddress>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getAddress.request(parameters);
```

## Action

- [`getAddress`](/core/api/actions/records/get-address)
