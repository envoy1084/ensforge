---
title: getIndexedResolver
description: Returns indexed resolver metadata and name bindings.
---

# getIndexedResolver

Returns indexed resolver metadata and name bindings.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.indexer.getIndexedResolver({
  address: "0x0000000000000000000000000000000000000000",
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="indexer.getIndexedResolver" />

## Parameters

```ts
import type { GetIndexedResolverParametersType } from "@ensforge/sdk/indexer";
```

### address

`` `0x${string}` ``

Resolver contract address.

### protocol

`"v1" | "v2" | undefined`

Restricts the lookup to one protocol.

### name

`string | undefined`

Optionally focuses the result on one name binding. Cannot be combined with `namehash`.

### namehash

`` `0x${string}` | undefined ``

Optionally focuses the result on one namehash. Cannot be combined with `name`.

## Return Type

```ts
import type { GetIndexedResolverResultType } from "@ensforge/sdk/indexer";
```

Returns `IndexedResolverV1 | IndexedResolverV2 | null`. Common fields describe address, bindings, node count, truncation, and source; ENSv2 adds owner, aliases, and role-holder count.

## Protocol Sources

ENSv2 is preferred when available, followed by ENSv1. An optional protocol selector on resolver queries disables fallback.

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.indexer.getIndexedResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

```ts
import type { GetIndexedResolverError } from "@ensforge/sdk/indexer";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getIndexedResolver`](/core/api/actions/indexer/resolvers/get-indexed-resolver)

## Hook

- [`useIndexedResolver`](/react/api/hooks/indexer/resolvers/use-indexed-resolver)
