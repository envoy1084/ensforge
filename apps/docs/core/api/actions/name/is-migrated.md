---
title: isMigrated
description: Check whether an ENS name migrated from ENSv1 to ENSv2.
---

# isMigrated

Check whether an ENS name migrated from ENSv1 to ENSv2.

## Import

```ts
import { isMigrated } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { isMigrated } from "@ensforge/core";
import { config } from "./config";

const migrated = await isMigrated(config, { name: "example.eth" });
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
type IsMigratedResult = Awaited<ReturnType<typeof isMigrated>>;
```

| Property  | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| `valueOf` | `() => boolean` | function valueOf() { [native code] } |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = isMigrated.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = isMigrated.request(parameters);
```

## Error

```ts
import type { IsMigratedError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.name.isMigrated`](/sdk/api/name/is-migrated)
