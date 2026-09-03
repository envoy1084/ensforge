---
title: getName
description: Gets name for ENS resolver records.
---

# getName

Gets name for ENS resolver records.

## Import

```ts
import { getName } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getName } from "@ensforge/core";
import { config } from "./config";

const result = await getName(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="records.getName" />

## Parameters

```ts
import type { GetNameParameters } from "@ensforge/core";
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getName.request(parameters);
```

## Error

```ts
import type { GetNameError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getName`](/sdk/api/records/get-name)
