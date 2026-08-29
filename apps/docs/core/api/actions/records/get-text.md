---
title: getText
description: Gets text for ENS resolver records.
---

# getText

Gets text for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getText } from "@ensforge/core";
```

## Usage

```ts
import { getText } from "@ensforge/core";
import { config } from "./config";

const result = await getText(config, {
  name: "example.eth",
  key: "url",
});
```

## Parameters

```ts
type GetTextParameters = Parameters<typeof getText>[1];
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
type GetTextResult = Awaited<ReturnType<typeof getText>>;
```

`{ readonly key: string; readonly value: string | null; }`

## Effect

```ts
const effect = getText.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getText.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetTextError = Effect.Effect.Error<ReturnType<typeof getText.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
