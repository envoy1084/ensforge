---
title: getRecords
description: Gets a typed selection of resolver records in one operation.
---

# getRecords

Gets a typed selection of resolver records in one operation.

## Import

```ts
import { getRecords } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getRecords } from "@ensforge/core";
import { config } from "./config";

const result = await getRecords(config, {
  name: "example.eth",
  records: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof getRecords>[1];
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### records

`Selection`

Records selected, read, or written by the operation.

### gatewayUrls

`AssetGatewayUrls | undefined`

Gateway URL overrides used to resolve external avatar assets.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetRecordsResult = Awaited<ReturnType<typeof getRecords>>;
```

| Property | Type                               | Description          |
| -------- | ---------------------------------- | -------------------- |
| `name`   | `string & Brand<"NormalizedName">` | Normalized ENS name. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getRecords.request(parameters);
```

## Error

```ts
import type { GetRecordsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.getRecords`](/sdk/api/records/get-records)
