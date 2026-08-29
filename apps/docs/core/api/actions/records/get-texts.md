---
title: getTexts
description: Gets texts for ENS resolver records.
---

# getTexts

Gets texts for ENS resolver records.

## Import

```ts
import { getTexts } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getTexts } from "@ensforge/core";
import { config } from "./config";

const result = await getTexts(config, {
  name: "example.eth",
  keys: ["url", "com.github"],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetTextsParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### keys

`ReadonlyArray<string>`

Record keys to read.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTextsResult = Awaited<ReturnType<typeof getTexts>>;
```

Returns `readonly { readonly key: string; readonly value: string | null; }[]`.

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getTexts.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getTexts.request(parameters);
```

## Error

```ts
import type { GetTextsError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getTexts`](/sdk/api/records/get-texts)
