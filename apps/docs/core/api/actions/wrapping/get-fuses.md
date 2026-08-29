---
title: getFuses
description: Gets fuses for wrapped names, expiries, and fuses.
---

# getFuses

Gets fuses for wrapped names, expiries, and fuses.

This action belongs to wrapped names, expiries, and fuses. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getFuses } from "@ensforge/core";
```

## Usage

```ts
import { getFuses } from "@ensforge/core";
import { config } from "./config";

const result = await getFuses(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetFusesParameters = Parameters<typeof getFuses>[1];
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
type GetFusesResult = Awaited<ReturnType<typeof getFuses>>;
```

`GetFusesResult`

## Effect

```ts
const effect = getFuses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getFuses.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetFusesError = Effect.Effect.Error<ReturnType<typeof getFuses.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
