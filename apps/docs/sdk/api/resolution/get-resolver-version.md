---
title: getResolverVersion
description: Gets resolver version for resolution and resolver lifecycle.
---

# getResolverVersion

Gets resolver version for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.resolution.getResolverVersion({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetResolverVersionParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetResolverVersionResult = Awaited<ReturnType<typeof getResolverVersion>>;
```

| Property    | Type                                                            | Description                                            |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------------ |
| `supported` | `false \| true`                                                 | Whether the selected protocol supports this operation. |
| `name`      | `string & Brand<"NormalizedName">`                              | Normalized ENS name.                                   |
| `resolver`  | `&#96;0x${string}&#96; \| null \| &#96;0x${string}&#96;`        | The resolver value returned by the operation.          |
| `reason`    | `"RESOLVER_NOT_FOUND" \| "VERSIONING_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |
| `version`   | `bigint \| undefined`                                           | The version value returned by the operation.           |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.resolution.getResolverVersion.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.resolution.getResolverVersion.request(parameters);
```

## Error

```ts
import type { GetResolverVersionError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getResolverVersion`](/core/api/actions/resolution/get-resolver-version)
