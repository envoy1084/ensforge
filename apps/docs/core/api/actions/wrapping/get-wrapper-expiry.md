---
title: getWrapperExpiry
description: Gets wrapper expiry for wrapped names, expiries, and fuses.
---

# getWrapperExpiry

Gets wrapper expiry for wrapped names, expiries, and fuses.

This action belongs to wrapped names, expiries, and fuses. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getWrapperExpiry } from "@ensforge/core";
```

## Usage

```ts
import { getWrapperExpiry } from "@ensforge/core";
import { config } from "./config";

const result = await getWrapperExpiry(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetWrapperExpiryParameters = Parameters<typeof getWrapperExpiry>[1];
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
type GetWrapperExpiryResult = Awaited<ReturnType<typeof getWrapperExpiry>>;
```

`GetWrapperExpiryResult`

## Effect

```ts
const effect = getWrapperExpiry.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getWrapperExpiry.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetWrapperExpiryError = Effect.Effect.Error<ReturnType<typeof getWrapperExpiry.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
