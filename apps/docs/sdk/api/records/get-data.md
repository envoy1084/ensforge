---
title: getData
description: Gets data for resolver records.
---

# getData

Gets data for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getData({
  name: "example.eth",
  key: "url",
});
```

## Parameters

```ts
type GetDataParameters = Parameters<typeof sdk.records.getData>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### key

`string`

Record key.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDataResult = Awaited<ReturnType<typeof sdk.records.getData>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getData.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getData.request(parameters);
```

## Action

- [`getData`](/core/api/actions/records/get-data)
