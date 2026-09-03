---
title: getTexts
description: Gets texts for resolver records.
---

# getTexts

Gets texts for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getTexts({
  name: "example.eth",
  keys: ["url"],
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="records.getTexts" />

## Parameters

```ts
import type { GetTextsParameters } from "@ensforge/sdk/records";
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getTexts.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getTexts.request(parameters);
```

## Error

```ts
import type { GetTextsError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getTexts`](/core/api/actions/records/get-texts)
