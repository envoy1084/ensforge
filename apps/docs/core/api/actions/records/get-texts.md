---
title: getTexts
description: Gets texts for ENS resolver records.
---

# getTexts

Gets texts for ENS resolver records.

## Import

```ts
import { getTexts } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getTexts } from "@ensforge/core";
import { config } from "./config";

const result = await getTexts(config, {
  name: "example.eth",
  keys: ["url", "com.github"],
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="records.getTexts" />

## Parameters

```ts
import type { GetTextsParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### keys

`ReadonlyArray<string>`

Record keys to read.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTextsResult = Awaited<ReturnType<typeof getTexts>>;
```

Returns `readonly { readonly key: string; readonly value: string | null; }[]`.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getTexts.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getTexts.request(parameters);
```

## Error

```ts
import type { GetTextsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getTexts`](/sdk/api/records/get-texts)
