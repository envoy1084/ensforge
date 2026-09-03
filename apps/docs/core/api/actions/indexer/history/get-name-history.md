---
title: getNameHistory
description: Lists normalized indexed history for one ENS name.
---

# getNameHistory

Lists normalized indexed history for one ENS name.

## Import

```ts
import { getNameHistory } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getNameHistory } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getNameHistory(config, {
  name: "example.eth",
  kinds: ["transfer", "resolver", "record"],
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetNameHistoryParameters } from "@ensforge/core/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

### kinds

`readonly IndexedEventKind[] | undefined`

Semantic event kinds to include. Omitting it includes every compatible kind.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetNameHistoryResult } from "@ensforge/core/indexer";
```

Items are discriminated by semantic `kind` and contain normalized chain position, protocol, name identity, raw metadata, and kind-specific fields.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Compatible events from enabled ENSv1 and ENSv2 sources are normalized and merged by chain position.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getNameHistory.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetNameHistoryError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getNameHistory`](/sdk/api/indexer/history/get-name-history)
- [`useIndexedNameHistory`](/react/api/hooks/indexer/history/use-indexed-name-history)
