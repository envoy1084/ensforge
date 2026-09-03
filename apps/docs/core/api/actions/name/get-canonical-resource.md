---
title: getCanonicalResource
description: Get the canonical ENSv2 resource identifier for a name.
---

# getCanonicalResource

Get the canonical ENSv2 resource identifier for a name.

## Import

```ts
import { getCanonicalResource } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getCanonicalResource } from "@ensforge/core";
import { config } from "./config";

const resource = await getCanonicalResource(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="name.getCanonicalResource" />

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
type GetCanonicalResourceResult = Awaited<ReturnType<typeof getCanonicalResource>>;
```

| Property  | Type                        | Description                          |
| --------- | --------------------------- | ------------------------------------ |
| `valueOf` | `() => bigint \| undefined` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getCanonicalResource.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getCanonicalResource.request(parameters);
```

## Error

```ts
import type { GetCanonicalResourceError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.getCanonicalResource`](/sdk/api/name/get-canonical-resource)
