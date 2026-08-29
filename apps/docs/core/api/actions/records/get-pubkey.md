---
title: getPubkey
description: Gets pubkey for ENS resolver records.
---

# getPubkey

Gets pubkey for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getPubkey } from "@ensforge/core";
```

## Usage

```ts
import { getPubkey } from "@ensforge/core";
import { config } from "./config";

const result = await getPubkey(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetPubkeyParameters = Parameters<typeof getPubkey>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetPubkeyResult = Awaited<ReturnType<typeof getPubkey>>;
```

`{ readonly x: `0x${string}`; readonly y: `0x${string}`; } | null`

## Effect

```ts
const effect = getPubkey.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getPubkey.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetPubkeyError = Effect.Effect.Error<ReturnType<typeof getPubkey.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
