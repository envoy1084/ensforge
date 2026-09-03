---
title: getRegistry
description: Returns indexed metadata for one ENSv2 registry.
---

# getRegistry

Returns indexed metadata for one ENSv2 registry.

## Import

```ts
import { getRegistry } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getRegistry } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getRegistry(config, { name: "example.eth" });
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getRegistry" />

## Parameters

```ts
import type { GetRegistryParametersType } from "@ensforge/core/indexer";
```

### address

`` `0x${string}` | undefined ``

Registry contract address. Provide either `address` or `name`.

### name

`string | undefined`

Managed ENS name. Provide either `name` or `address`.

## Return Type

```ts
import type { GetRegistryResultType } from "@ensforge/core/indexer";
```

When supported, `value` is the indexed registry or `null` when it is not found.

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getRegistry.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistryError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getRegistry`](/sdk/api/indexer/registries/get-registry)
- [`useIndexedRegistry`](/react/api/hooks/indexer/registries/use-indexed-registry)
