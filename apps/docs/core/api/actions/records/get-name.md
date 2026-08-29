---
title: getName
description: Gets name for ENS resolver records.
---

# getName

Gets name for ENS resolver records.

## Import

```ts
import { getName } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getName } from "@ensforge/core";
import { config } from "./config";

const result = await getName(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetNameParameters } from "@ensforge/core";
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
type GetNameResult = Awaited<ReturnType<typeof getName>>;
```

| Property | Type             | Description          |
| -------- | ---------------- | -------------------- |
| `name`   | `string \| null` | Normalized ENS name. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getName.request(parameters);
```

## Error

```ts
import type { GetNameError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getName`](/sdk/api/records/get-name)
