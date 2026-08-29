---
title: getText
description: Gets text for resolver records.
---

# getText

Gets text for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.records.getText({
  name: "example.eth",
  key: "url",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetTextParameters } from "@ensforge/sdk";
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
import { ens } from "./client";

const program = ens.records.getText.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.records.getText.request(parameters);
```

## Error

```ts
import type { GetTextError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getText`](/core/api/actions/records/get-text)
