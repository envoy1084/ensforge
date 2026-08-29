---
title: getAddresses
description: Gets addresses for resolver records.
---

# getAddresses

Gets addresses for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getAddresses({
  name: "example.eth",
  coinTypes: [60n],
});
```

## Parameters

```ts
type GetAddressesParameters = Parameters<typeof sdk.records.getAddresses>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### coinTypes

`ReadonlyArray<bigint>`

SLIP-44 coin types to resolve.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAddressesResult = Awaited<ReturnType<typeof sdk.records.getAddresses>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getAddresses.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getAddresses.request(parameters);
```

## Action

- [`getAddresses`](/core/api/actions/records/get-addresses)
