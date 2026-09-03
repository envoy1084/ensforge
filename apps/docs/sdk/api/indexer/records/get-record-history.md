---
title: getRecordHistory
description: Lists normalized resolver-record changes across ENS protocols.
---

# getRecordHistory

Lists normalized resolver-record changes across ENS protocols.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRecordHistory({
  name: "example.eth",
  filter: { kinds: ["text", "address"] },
  pageSize: 20,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getRecordHistory" />

## Parameters

```ts
import type { GetRecordHistoryParametersType } from "@ensforge/sdk/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

### filter

<!--@include: @/shared/indexer/record-history-filter.md-->

### order

`{ direction: "asc" | "desc" } | undefined`

Orders by chain position. Defaults to descending.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRecordHistoryResultType } from "@ensforge/sdk/indexer";
```

Items are discriminated by record `kind` and contain normalized chain position, resolver, source, and kind-specific fields.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Compatible events from enabled ENSv1 and ENSv2 sources are normalized and merged by chain position.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getRecordHistory.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRecordHistoryError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRecordHistory`](/core/api/actions/indexer/records/get-record-history)

## Hook

- [`useRecordHistory`](/react/api/hooks/indexer/records/use-record-history)
