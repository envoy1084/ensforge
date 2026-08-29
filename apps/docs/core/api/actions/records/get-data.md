---
title: getData
description: Gets data for ENS resolver records.
---

# getData

Gets data for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getData } from "@ensforge/core";
```

## Usage

```ts
import { getData } from "@ensforge/core";
import { config } from "./config";

const result = await getData(config, {
  name: "example.eth",
  key: "url",
});
```

## Parameters

```ts
type GetDataParameters = Parameters<typeof getData>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

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
type GetDataResult = Awaited<ReturnType<typeof getData>>;
```

`{ readonly key: string; readonly value: `0x${string}` | null; }`

## Effect

```ts
const effect = getData.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getData.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetDataError = Effect.Effect.Error<ReturnType<typeof getData.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
