---
title: getAvatar
description: Gets avatar for ENS resolver records.
---

# getAvatar

Gets avatar for ENS resolver records.

## Import

```ts
import { getAvatar } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getAvatar } from "@ensforge/core";
import { config } from "./config";

const result = await getAvatar(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetAvatarParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### gatewayUrls

`AssetGatewayUrls | undefined`

Gateway URL overrides used to resolve external avatar assets.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetAvatarResult = Awaited<ReturnType<typeof getAvatar>>;
```

| Property  | Type                                             | Description                                            |
| --------- | ------------------------------------------------ | ------------------------------------------------------ |
| `status`  | `"resolved" \| "unsupported-chain" \| undefined` | Current query, transaction, batch, or workflow status. |
| `record`  | `string \| undefined`                            | The record value returned by the operation.            |
| `uri`     | `string \| undefined`                            | The uri value returned by the operation.               |
| `chainId` | `number \| undefined`                            | The chainId value returned by the operation.           |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getAvatar.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getAvatar.request(parameters);
```

## Error

```ts
import type { GetAvatarError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getAvatar`](/sdk/api/records/get-avatar)
