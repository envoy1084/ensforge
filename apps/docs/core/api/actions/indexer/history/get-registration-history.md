---
title: getRegistrationHistory
description: Lists registration and renewal history for one ENS name.
---

# getRegistrationHistory

Lists registration and renewal history for one ENS name.

## Import

```ts
import { getRegistrationHistory } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistrationHistory } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getRegistrationHistory(config, {
  name: "example.eth",
  pageSize: 20,
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getRegistrationHistory" />

## Parameters

```ts
import type { GetRegistrationHistoryParameters } from "@ensforge/core/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

<!--@include: @/shared/indexer/pagination-parameters.md-->

## Return Type

```ts
import type { GetRegistrationHistoryResult } from "@ensforge/core/indexer";
```

Items are discriminated by semantic `kind` and contain normalized chain position, protocol, name identity, raw metadata, and kind-specific fields.

<!--@include: @/shared/indexer/page-result.md-->

## Protocol Sources

Compatible events from enabled ENSv1 and ENSv2 sources are normalized and merged by chain position.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistrationHistory.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistrationHistoryError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getRegistrationHistory`](/sdk/api/indexer/history/get-registration-history)
- [`useRegistrationHistory`](/react/api/hooks/indexer/history/use-registration-history)
