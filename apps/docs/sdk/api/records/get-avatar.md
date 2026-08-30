---
title: getAvatar
description: Gets avatar for resolver records.
---

# getAvatar

Gets avatar for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getAvatar({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetAvatarParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### gatewayUrls

`AssetGatewayUrls | undefined`

Value used for `gatewayUrls` by this method.

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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getAvatar.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getAvatar.request(parameters);
```

## Error

```ts
import type { GetAvatarError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getAvatar`](/core/api/actions/records/get-avatar)
