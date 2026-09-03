---
title: getResolverMetadata
description: Returns the latest indexed ENSIP-16 metadata publication for a resolver.
---

# getResolverMetadata

Returns the latest indexed ENSIP-16 metadata publication for a resolver.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getResolverMetadata({
  resolver: "0x0000000000000000000000000000000000000000",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetResolverMetadataParametersType } from "@ensforge/sdk/indexer";
```

### resolver

`` `0x${string}` ``

Resolver contract whose latest metadata publication should be returned.

## Return Type

```ts
import type { GetResolverMetadataResultType } from "@ensforge/sdk/indexer";
```

When supported, `value` contains the resolver, GraphQL URL, chain position, transaction hash, and source, or `null` when unpublished.

## Protocol Sources

<!--@include: @/shared/indexer/v2-result.md-->

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getResolverMetadata.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetResolverMetadataError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getResolverMetadata`](/core/api/actions/indexer/resolvers/get-resolver-metadata)

## Hook

- [`useResolverMetadata`](/react/api/hooks/indexer/resolvers/use-resolver-metadata)
