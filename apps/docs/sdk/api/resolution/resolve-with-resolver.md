---
title: resolveWithResolver
description: Resolves calldata against an explicit resolver.
---

# resolveWithResolver

Resolves calldata against an explicit resolver.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.resolution.resolveWithResolver({
  name: "example.eth",
  data: "0x",
  resolverAddress: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ResolveWithResolverParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### data

`string`

Raw calldata or record bytes.

### resolverAddress

`string`

Explicit resolver contract.

### gateways

`ReadonlyArray<string> | undefined`

DNS gateway endpoints.

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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.resolution.resolveWithResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.resolution.resolveWithResolver.request(parameters);
```

## Error

```ts
import type { ResolveWithResolverError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`resolveWithResolver`](/core/api/actions/resolution/resolve-with-resolver)
