---
title: getPrimaryName
description: Gets and optionally forward-verifies the primary name for an address.
---

# getPrimaryName

Gets and optionally forward-verifies the primary name for an address.

## Import

```ts
import { getPrimaryName } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getPrimaryName } from "@ensforge/core";
import { config } from "./config";

const result = await getPrimaryName(config, {
  address: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetPrimaryNameParameters } from "@ensforge/core";
```

### address

`string`

Address used by this operation.

### coinType

`bigint | undefined`

SLIP-44 coin type. Optional address reads default to `60n` for Ethereum.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetPrimaryNameResult = Awaited<ReturnType<typeof getPrimaryName>>;
```

| Property | Type                                            | Description                                |
| -------- | ----------------------------------------------- | ------------------------------------------ |
| `name`   | `string & Brand<"NormalizedName"> \| undefined` | Normalized ENS name.                       |
| `match`  | `true \| undefined`                             | The match value returned by the operation. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getPrimaryName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getPrimaryName.request(parameters);
```

## Error

```ts
import type { GetPrimaryNameError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.reverse.getPrimaryName`](/sdk/api/reverse/get-primary-name)
