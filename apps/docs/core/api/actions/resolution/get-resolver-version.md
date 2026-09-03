---
title: getResolverVersion
description: Gets resolver version for resolver discovery and Universal Resolver calls.
---

# getResolverVersion

Gets resolver version for resolver discovery and Universal Resolver calls.

## Import

```ts
import { getResolverVersion } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getResolverVersion } from "@ensforge/core";
import { config } from "./config";

const result = await getResolverVersion(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="resolution.getResolverVersion" />

## Parameters

```ts
import type { GetResolverVersionParameters } from "@ensforge/core";
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getResolverVersion.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getResolverVersion.request(parameters);
```

## Error

```ts
import type { GetResolverVersionError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.resolution.getResolverVersion`](/sdk/api/resolution/get-resolver-version)
