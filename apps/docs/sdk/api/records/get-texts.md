---
title: getTexts
description: Gets texts for resolver records.
---

# getTexts

Gets texts for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.records.getTexts({
  name: "example.eth",
  keys: ["url"],
});
```

## Parameters

```ts
type GetTextsParameters = Parameters<typeof sdk.records.getTexts>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### keys

`ReadonlyArray<string>`

Record keys to read.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTextsResult = Awaited<ReturnType<typeof sdk.records.getTexts>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.records.getTexts.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.records.getTexts.request(parameters);
```

## Action

- [`getTexts`](/core/api/actions/records/get-texts)
