---
title: getTexts
description: Gets texts for ENS resolver records.
---

# getTexts

Gets texts for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getTexts } from "@ensforge/core";
```

## Usage

```ts
import { getTexts } from "@ensforge/core";
import { config } from "./config";

const result = await getTexts(config, {
  name: "example.eth",
  keys: ["url", "com.github"],
});
```

## Parameters

```ts
type GetTextsParameters = Parameters<typeof getTexts>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

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
type GetTextsResult = Awaited<ReturnType<typeof getTexts>>;
```

`readonly { readonly key: string; readonly value: string | null; }[]`

## Effect

```ts
const effect = getTexts.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getTexts.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetTextsError = Effect.Effect.Error<ReturnType<typeof getTexts.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
