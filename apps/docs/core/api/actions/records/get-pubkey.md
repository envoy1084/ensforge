---
title: getPubkey
description: Gets pubkey for ENS resolver records.
---

# getPubkey

Gets pubkey for ENS resolver records.

## Import

```ts
import { getPubkey } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getPubkey } from "@ensforge/core";
import { config } from "./config";

const result = await getPubkey(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetPubkeyParameters } from "@ensforge/core";
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
type GetPubkeyResult = Awaited<ReturnType<typeof getPubkey>>;
```

| Property | Type                                 | Description                            |
| -------- | ------------------------------------ | -------------------------------------- |
| `x`      | `&#96;0x${string}&#96; \| undefined` | The x value returned by the operation. |
| `y`      | `&#96;0x${string}&#96; \| undefined` | The y value returned by the operation. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getPubkey.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getPubkey.request(parameters);
```

## Error

```ts
import type { GetPubkeyError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getPubkey`](/sdk/api/records/get-pubkey)
