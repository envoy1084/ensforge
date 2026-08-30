---
title: getRecords
description: Gets a typed selection of resolver records.
---

# getRecords

Gets a typed selection of resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.getRecords({
  name: "example.eth",
  records: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof sdk.records.getRecords>[0];
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### records

`Selection`

Records selected, read, or written.

### gatewayUrls

`AssetGatewayUrls | undefined`

Value used for `gatewayUrls` by this method.

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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.records.getRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.records.getRecords.request(parameters);
```

## Error

```ts
import type { GetRecordsError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRecords`](/core/api/actions/records/get-records)
