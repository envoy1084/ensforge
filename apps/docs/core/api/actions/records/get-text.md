---
title: getText
description: Gets text for ENS resolver records.
---

# getText

Gets text for ENS resolver records.

## Import

```ts
import { getText } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getText } from "@ensforge/core";
import { config } from "./config";

const result = await getText(config, {
  name: "example.eth",
  key: "url",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetTextParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### key

`string`

Record key.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTextResult = Awaited<ReturnType<typeof getText>>;
```

| Property | Type             | Description                                         |
| -------- | ---------------- | --------------------------------------------------- |
| `key`    | `string`         | The key value returned by the operation.            |
| `value`  | `string \| null` | Decoded value returned by the contract or resolver. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getText.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getText.request(parameters);
```

## Error

```ts
import type { GetTextError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getText`](/sdk/api/records/get-text)
