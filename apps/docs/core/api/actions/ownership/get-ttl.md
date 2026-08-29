---
title: getTtl
description: Gets ttl for name ownership and registry management.
---

# getTtl

Gets ttl for name ownership and registry management.

## Import

```ts
import { getTtl } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getTtl } from "@ensforge/core";
import { config } from "./config";

const result = await getTtl(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetNameStateParameters } from "@ensforge/core";
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
type GetTtlResult = Awaited<ReturnType<typeof getTtl>>;
```

| Property    | Type                             | Description                                            |
| ----------- | -------------------------------- | ------------------------------------------------------ |
| `supported` | `true \| false`                  | Whether the selected protocol supports this operation. |
| `protocol`  | `"v1" \| "v2"`                   | ENS protocol route used for the result.                |
| `ttl`       | `bigint \| undefined`            | The ttl value returned by the operation.               |
| `reason`    | `"TTL_UNSUPPORTED" \| undefined` | The reason value returned by the operation.            |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getTtl.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getTtl.request(parameters);
```

## Error

```ts
import type { GetTtlError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.ownership.getTtl`](/sdk/api/ownership/get-ttl)
