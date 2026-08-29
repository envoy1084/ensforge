---
title: getCallsStatus
description: Gets calls status for typed read and wallet-aware write batching.
---

# getCallsStatus

Gets calls status for typed read and wallet-aware write batching.

## Import

```ts
import { getCallsStatus } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getCallsStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getCallsStatus(config, {
  id: "0x1234",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetCallsStatusParameters } from "@ensforge/core";
```

### id

`string`

Identifier of a submitted wallet call batch.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { CallsStatusResult } from "@ensforge/core";
```

| Property     | Type                                               | Description                                                 |
| ------------ | -------------------------------------------------- | ----------------------------------------------------------- |
| `id`         | `string`                                           | Stable operation or wallet batch identifier.                |
| `chainId`    | `number`                                           | The chainId value returned by the operation.                |
| `status`     | `"pending" \| "success" \| "failure" \| "unknown"` | Current query, transaction, batch, or workflow status.      |
| `statusCode` | `number`                                           | The statusCode value returned by the operation.             |
| `atomic`     | `boolean`                                          | Whether the wallet guarantees the calls execute atomically. |
| `receipts`   | `readonly WriteReceipt[]`                          | Confirmed transaction receipts.                             |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getCallsStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.batch.getCallsStatus`](/sdk/api/batch/get-calls-status)
