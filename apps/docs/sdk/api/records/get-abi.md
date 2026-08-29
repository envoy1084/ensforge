---
title: getAbi
description: Gets abi for resolver records.
---

# getAbi

Gets abi for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getAbi({
  name: "example.eth",
});
```

## Parameters

```ts
type GetAbiParameters = Parameters<typeof sdk.records.getAbi>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### contentTypes

`ReadonlyArray<AbiContentType> | undefined`

Value used for `contentTypes` by this method.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAbiResult = Awaited<ReturnType<typeof sdk.records.getAbi>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getAbi.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getAbi.request(parameters);
```

## Action

- [`getAbi`](/core/api/actions/records/get-abi)
