---
title: setPubkey
description: Sets pubkey for ENS resolver records.
---

# setPubkey

Sets pubkey for ENS resolver records.

## Import

```ts
import { setPubkey } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setPubkey } from "@ensforge/core";
import { config } from "./config";

const result = await setPubkey(config, {
  name: "example.eth",
  x: "0x0000000000000000000000000000000000000000000000000000000000000001",
  y: "0x0000000000000000000000000000000000000000000000000000000000000002",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetPubkeyParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### x

`Hex`

X coordinate of the secp256k1 public key.

### y

`Hex`

Y coordinate of the secp256k1 public key.

## Return Type

```ts
import type { CallExecutionResult } from "@ensforge/core";
```

| Property    | Type                                          | Description                                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `id`        | `string`                                      | Stable operation or wallet batch identifier.                                   |
| `operation` | `string`                                      | The operation value returned by the operation.                                 |
| `status`    | `"not-started" \| "submitted" \| "confirmed"` | Current query, transaction, batch, or workflow status.                         |
| `hash`      | `null \| &#96;0x${string}&#96; \| null`       | Transaction hash, or `null` before submission.                                 |
| `receipt`   | `null \| WriteReceipt \| null`                | Normalized transaction receipt, or `null` when confirmation was not requested. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = setPubkey.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = setPubkey.call(parameters);
```

## Error

```ts
import type { SetPubkeyError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.records.setPubkey`](/sdk/api/records/set-pubkey)
