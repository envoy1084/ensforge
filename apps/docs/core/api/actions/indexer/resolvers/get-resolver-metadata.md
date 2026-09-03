---
title: getResolverMetadata
description: Returns the latest indexed ENSIP-16 metadata publication for a resolver.
---

# getResolverMetadata

Returns the latest indexed ENSIP-16 metadata publication for a resolver.

## Import

```ts
import { getResolverMetadata } from "@ensforge/core/indexer";
```

## Usage

::: code-group

```ts [index.ts]
import { getResolverMetadata } from "@ensforge/core/indexer";
import { config } from "./config";

const result = await getResolverMetadata(config, {
  resolver: "0x0000000000000000000000000000000000000000",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="indexer.getResolverMetadata" />

## Parameters

```ts
import type { GetResolverMetadataParametersType } from "@ensforge/core/indexer";
```

### resolver

`` `0x${string}` ``

Resolver contract whose latest metadata publication should be returned.

## Return Type

```ts
import type { GetResolverMetadataResultType } from "@ensforge/core/indexer";
```

When supported, `value` contains the resolver, GraphQL URL, chain position, transaction hash, and source, or `null` when unpublished.

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getResolverMetadata.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolverMetadataError } from "@ensforge/core/indexer";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.indexer.getResolverMetadata`](/sdk/api/indexer/resolvers/get-resolver-metadata)
- [`useResolverMetadata`](/react/api/hooks/indexer/resolvers/use-resolver-metadata)
