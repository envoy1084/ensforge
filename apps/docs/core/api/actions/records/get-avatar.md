---
title: getAvatar
description: Gets avatar for ENS resolver records.
---

# getAvatar

Gets avatar for ENS resolver records.

This action belongs to ENS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getAvatar } from "@ensforge/core";
```

## Usage

```ts
import { getAvatar } from "@ensforge/core";
import { config } from "./config";

const result = await getAvatar(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetAvatarParameters = Parameters<typeof getAvatar>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### gatewayUrls

`AssetGatewayUrls | undefined`

Gateway URL overrides used to resolve external avatar assets.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAvatarResult = Awaited<ReturnType<typeof getAvatar>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getAvatar.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getAvatar.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetAvatarError = Effect.Effect.Error<ReturnType<typeof getAvatar.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
