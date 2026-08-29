---
title: getTokenId
description: Get the registrar, wrapper, or registry token ID for an ENS name.
---

# getTokenId

Get the registrar, wrapper, or registry token ID for an ENS name.

## Import

```ts
import { getTokenId } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getTokenId } from "@ensforge/core";
import { config } from "./config";

const tokenId = await getTokenId(config, { name: "ens.eth" });
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTokenIdResult = Awaited<ReturnType<typeof getTokenId>>;
```

| Property  | Type                        | Description                          |
| --------- | --------------------------- | ------------------------------------ |
| `valueOf` | `() => bigint \| undefined` | function valueOf() { [native code] } |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getTokenId.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getTokenId.request(parameters);
```

## Error

```ts
import type { GetTokenIdError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.name.getTokenId`](/sdk/api/name/get-token-id)
