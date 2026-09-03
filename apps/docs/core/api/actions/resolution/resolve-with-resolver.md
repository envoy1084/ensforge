---
title: resolveWithResolver
description: Resolves arbitrary calldata against an explicit resolver.
---

# resolveWithResolver

Resolves arbitrary calldata against an explicit resolver.

## Import

```ts
import { resolveWithResolver } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { resolveWithResolver } from "@ensforge/core";
import { config } from "./config";

const result = await resolveWithResolver(config, {
  name: "example.eth",
  data: "0x",
  resolverAddress: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="resolution.resolveWithResolver" />

## Parameters

```ts
import type { ResolveWithResolverParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### data

`string`

Raw calldata or resolver bytes.

### resolverAddress

`string`

Explicit resolver contract address.

### gateways

`ReadonlyArray<string> | undefined`

DNS gateway endpoints used to obtain proofs.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type ResolveWithResolverResult = Awaited<ReturnType<typeof resolveWithResolver>>;
```

| Property          | Type                    | Description                                          |
| ----------------- | ----------------------- | ---------------------------------------------------- |
| `data`            | `&#96;0x${string}&#96;` | The data value returned by the operation.            |
| `resolverAddress` | `&#96;0x${string}&#96;` | The resolverAddress value returned by the operation. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = resolveWithResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = resolveWithResolver.request(parameters);
```

## Error

```ts
import type { ResolveWithResolverError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.resolution.resolveWithResolver`](/sdk/api/resolution/resolve-with-resolver)
