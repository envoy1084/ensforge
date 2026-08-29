---
title: isMigrated
description: Check whether an ENS name migrated from ENSv1 to ENSv2.
---

# isMigrated

Check whether an ENS name migrated from ENSv1 to ENSv2.

## Import

```ts
import { isMigrated } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { isMigrated } from "@ensforge/core";
import { config } from "./config";

const migrated = await isMigrated(config, { name: "example.eth" });
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
type IsMigratedResult = Awaited<ReturnType<typeof isMigrated>>;
```

| Property  | Type            | Description                          |
| --------- | --------------- | ------------------------------------ |
| `valueOf` | `() => boolean` | function valueOf() { [native code] } |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = isMigrated.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = isMigrated.request(parameters);
```

## Error

```ts
import type { IsMigratedError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.name.isMigrated`](/sdk/api/name/is-migrated)
