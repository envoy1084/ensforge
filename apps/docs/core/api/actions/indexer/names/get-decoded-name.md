---
title: getDecodedName
description: Recovers a human-readable ENS name from indexed encoded-label evidence.
---

# getDecodedName

Recovers a human-readable ENS name from indexed encoded-label evidence.

## Import

```ts
import { getDecodedName } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getDecodedName } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getDecodedName(config, {
  name: "example.eth",
  allowIncomplete: true,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetDecodedNameParametersType } from "@ensforge/core/indexer";
```

### name

`string`

Name to decode. Normalized labels are preserved and encoded labels are recovered from indexer evidence.

### allowIncomplete

`boolean | undefined`

Returns a partially decoded name when only some labels can be recovered. Defaults to `false`.

## Return Type

```ts
import type { GetDecodedNameResult } from "@ensforge/core/indexer";
```

Returns the decoded name, or `null` when the available evidence cannot satisfy the requested completeness.

## Protocol Sources

The action uses indexed name and label evidence from compatible sources and respects the configured strict or partial failure mode.

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getDecodedName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetDecodedNameError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getDecodedName`](/sdk/api/indexer/names/get-decoded-name)
- [`useDecodedName`](/react/api/hooks/indexer/names/use-decoded-name)
