---
title: getData
description: Gets data for resolver records.
---

# getData

Gets data for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getData({
  name: "example.eth",
  key: "url",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetDataParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### key

`string`

Record key.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDataResult = Awaited<ReturnType<typeof getData>>;
```

| Property | Type                            | Description                                         |
| -------- | ------------------------------- | --------------------------------------------------- |
| `key`    | `string`                        | The key value returned by the operation.            |
| `value`  | `&#96;0x${string}&#96; \| null` | Decoded value returned by the contract or resolver. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getData.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getData.request(parameters);
```

## Error

```ts
import type { GetDataError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getData`](/core/api/actions/records/get-data)
