---
title: getIndexedRecords
description: Returns indexed resolver bindings and record inventories for one name.
---

# getIndexedRecords

Returns indexed resolver bindings and record inventories for one name.

## Import

```ts
import { getIndexedRecords } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getIndexedRecords } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getIndexedRecords(config, { name: "example.eth" });
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getIndexedRecords" />

## Parameters

```ts
import type { GetIndexedRecordsParameters } from "@ensforge/core/indexer";
```

### name

`string | undefined`

ENS name to look up. Provide either `name` or `namehash`; names are normalized before querying.

### namehash

`` `0x${string}` | undefined ``

Namehash to use when the plaintext name is unavailable. Provide either `namehash` or `name`.

## Return Type

```ts
import type { GetIndexedRecordsResult } from "@ensforge/core/indexer";
```

Returns the namehash, `authoritative: false`, resolver bindings, and source statuses. Each binding identifies its resolver, current state, version, and inventories for text, address, contenthash, ABI, pubkey, interface, reverse-name, and authorization records.

## Protocol Sources

Record inventories from enabled ENSv1 and ENSv2 sources are combined. Values are not authoritative; use resolver actions for current onchain values.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getIndexedRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetIndexedRecordsError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getIndexedRecords`](/sdk/api/indexer/records/get-indexed-records)
- [`useIndexedRecords`](/react/api/hooks/indexer/records/use-indexed-records)
