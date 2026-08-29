---
title: getPubkey
description: Gets pubkey for resolver records.
---

# getPubkey

Gets pubkey for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.records.getPubkey({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetPubkeyParameters } from "@ensforge/sdk";
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
import { ens } from "./client";

const program = ens.records.getPubkey.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.records.getPubkey.request(parameters);
```

## Error

```ts
import type { GetPubkeyError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getPubkey`](/core/api/actions/records/get-pubkey)
