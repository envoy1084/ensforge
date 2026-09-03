---
title: getData
description: Gets data for ENS resolver records.
---

# getData

Gets data for ENS resolver records.

## Import

```ts
import { getData } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getData } from "@ensforge/core";
import { config } from "./config";

const result = await getData(config, {
  name: "example.eth",
  key: "url",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="records.getData" />

## Parameters

```ts
import type { GetDataParameters } from "@ensforge/core";
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getData.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getData.request(parameters);
```

## Error

```ts
import type { GetDataError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getData`](/sdk/api/records/get-data)
