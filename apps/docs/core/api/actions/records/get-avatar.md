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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getAvatar.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getAvatar.request(parameters);
```

## Error

```ts
import type { GetAvatarError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getAvatar`](/sdk/api/records/get-avatar)
