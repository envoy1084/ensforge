---
title: getContentHash
description: Gets content hash for ENS resolver records.
---

# getContentHash

Gets content hash for ENS resolver records.

## Import

```ts
import { getContentHash } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getContentHash } from "@ensforge/core";
import { config } from "./config";

const result = await getContentHash(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetContentHashParameters } from "@ensforge/core";
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
type GetContentHashResult = Awaited<ReturnType<typeof getContentHash>>;
```

| Property   | Type                                                                                            | Description                                               |
| ---------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `protocol` | `"ipfs" \| "arweave" \| "ipns" \| "swarm" \| "onion" \| "onion3" \| "skynet" \| "adnl" \| null` | ENS protocol route used for the result.                   |
| `value`    | `string \| null`                                                                                | Decoded value returned by the contract or resolver.       |
| `raw`      | `&#96;0x${string}&#96; & Brand<"ContentHash"> \| null`                                          | Raw resolver bytes, or `null` when the record is not set. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getContentHash.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getContentHash.request(parameters);
```

## Error

```ts
import type { GetContentHashError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.getContentHash`](/sdk/api/records/get-content-hash)
