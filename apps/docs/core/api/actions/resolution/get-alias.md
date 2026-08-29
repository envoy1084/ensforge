---
title: getAlias
description: Gets alias for resolver discovery and Universal Resolver calls.
---

# getAlias

Gets alias for resolver discovery and Universal Resolver calls.

## Import

```ts
import { getAlias } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getAlias } from "@ensforge/core";
import { config } from "./config";

const result = await getAlias(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetAliasParameters } from "@ensforge/core";
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
type GetAliasResult = Awaited<ReturnType<typeof getAlias>>;
```

| Property    | Type                                                          | Description                                               |
| ----------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| `supported` | `false \| true`                                               | Whether the selected protocol supports this operation.    |
| `name`      | `string & Brand<"NormalizedName">`                            | Normalized ENS name.                                      |
| `resolver`  | `&#96;0x${string}&#96; \| null \| &#96;0x${string}&#96;`      | The resolver value returned by the operation.             |
| `reason`    | `"RESOLVER_NOT_FOUND" \| "ALIASING_UNSUPPORTED" \| undefined` | The reason value returned by the operation.               |
| `target`    | `(string & Brand<"NormalizedName">) \| null \| undefined`     | The target value returned by the operation.               |
| `raw`       | `&#96;0x${string}&#96; \| undefined`                          | Raw resolver bytes, or `null` when the record is not set. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getAlias.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getAlias.request(parameters);
```

## Error

```ts
import type { GetAliasError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.resolution.getAlias`](/sdk/api/resolution/get-alias)
