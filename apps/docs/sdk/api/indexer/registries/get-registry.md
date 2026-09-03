---
title: getRegistry
description: Returns indexed metadata for one ENSv2 registry.
---

# getRegistry

Returns indexed metadata for one ENSv2 registry.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getRegistry({ name: "example.eth" });
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getRegistry" />

## Parameters

```ts
import type { GetRegistryParametersType } from "@ensforge/sdk/indexer";
```

### address

`` `0x${string}` | undefined ``

Registry contract address. Provide either `address` or `name`.

### name

`string | undefined`

Managed ENS name. Provide either `name` or `address`.

## Return Type

```ts
import type { GetRegistryResultType } from "@ensforge/sdk/indexer";
```

When supported, `value` is the indexed registry or `null` when it is not found.

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getRegistry.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetRegistryError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getRegistry`](/core/api/actions/indexer/registries/get-registry)

## Hook

- [`useIndexedRegistry`](/react/api/hooks/indexer/registries/use-indexed-registry)
