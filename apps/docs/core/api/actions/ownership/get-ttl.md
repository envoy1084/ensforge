---
title: getTtl
description: Gets ttl for name ownership and registry management.
---

# getTtl

Gets ttl for name ownership and registry management.

This action belongs to name ownership and registry management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getTtl } from "@ensforge/core";
```

## Usage

```ts
import { getTtl } from "@ensforge/core";
import { config } from "./config";

const result = await getTtl(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetTtlParameters = Parameters<typeof getTtl>[1];
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
type GetTtlResult = Awaited<ReturnType<typeof getTtl>>;
```

`TtlResult`

## Effect

```ts
const effect = getTtl.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getTtl.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetTtlError = Effect.Effect.Error<ReturnType<typeof getTtl.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
