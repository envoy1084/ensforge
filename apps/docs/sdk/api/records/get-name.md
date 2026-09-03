---
title: getName
description: Gets name for resolver records.
---

# getName

Gets name for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getName({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="records.getName" />

## Parameters

```ts
import type { GetNameParameters } from "@ensforge/sdk/records";
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
type GetNameResult = Awaited<ReturnType<typeof getName>>;
```

| Property | Type             | Description          |
| -------- | ---------------- | -------------------- |
| `name`   | `string \| null` | Normalized ENS name. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getName.request(parameters);
```

## Error

```ts
import type { GetNameError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getName`](/core/api/actions/records/get-name)
