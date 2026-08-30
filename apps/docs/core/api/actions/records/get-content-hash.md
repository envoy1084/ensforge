---
title: getContentHash
description: Gets content hash for ENS resolver records.
---

# getContentHash

Gets content hash for ENS resolver records.

## Import

```ts
import { getContentHash } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getContentHash } from "@ensforge/core";
import { config } from "./config";

const result = await getContentHash(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetContentHashParameters } from "@ensforge/core";
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
type GetContentHashResult = Awaited<ReturnType<typeof getContentHash>>;
```

| Property   | Type                                                                                            | Description                                               |
| ---------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `protocol` | `"ipfs" \| "arweave" \| "ipns" \| "swarm" \| "onion" \| "onion3" \| "skynet" \| "adnl" \| null` | ENS protocol route used for the result.                   |
| `value`    | `string \| null`                                                                                | Decoded value returned by the contract or resolver.       |
| `raw`      | `&#96;0x${string}&#96; & Brand<"ContentHash"> \| null`                                          | Raw resolver bytes, or `null` when the record is not set. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getContentHash.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getContentHash.request(parameters);
```

## Error

```ts
import type { GetContentHashError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getContentHash`](/sdk/api/records/get-content-hash)
