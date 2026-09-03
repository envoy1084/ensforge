---
title: getIndexedName
description: Returns the normalized indexed state for one ENS name.
---

# getIndexedName

Returns the normalized indexed state for one ENS name.

## Import

```ts
import { getIndexedName } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getIndexedName } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getIndexedName(config, { name: "example.eth" });
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetIndexedNameParameters } from "@ensforge/core/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

## Return Type

```ts
import type { GetIndexedNameResult } from "@ensforge/core/indexer";
```

Returns `IndexedNameV1 | IndexedNameV2 | null`. Narrow `protocol` before using protocol-specific ownership, wrapping, migration, registration, and registry fields.

## Protocol Sources

ENSv2 is preferred when available, followed by ENSv1. An optional protocol selector on resolver queries disables fallback.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getIndexedName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetIndexedNameError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getIndexedName`](/sdk/api/indexer/names/get-indexed-name)
- [`useIndexedName`](/react/api/hooks/indexer/names/use-indexed-name)
