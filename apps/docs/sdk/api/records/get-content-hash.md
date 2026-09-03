---
title: getContentHash
description: Gets content hash for resolver records.
---

# getContentHash

Gets content hash for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getContentHash({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="records.getContentHash" />

## Parameters

```ts
import type { GetContentHashParameters } from "@ensforge/sdk/records";
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getContentHash.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getContentHash.request(parameters);
```

## Error

```ts
import type { GetContentHashError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getContentHash`](/core/api/actions/records/get-content-hash)
