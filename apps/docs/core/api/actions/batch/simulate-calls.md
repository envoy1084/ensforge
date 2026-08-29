---
title: simulateCalls
description: simulate calls for typed read and wallet-aware write batching.
---

# simulateCalls

simulate calls for typed read and wallet-aware write batching.

## Import

```ts
import { simulateCalls } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { simulateCalls } from "@ensforge/core";
import { config } from "./config";

const result = await simulateCalls(config, {
  calls: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SimulateCallsParameters } from "@ensforge/core";
```

### calls

`ReadonlyArray<EnsWriteIntent<unknown, WriteError>>`

Read calls or write intents included in the operation.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
type SimulateCallsResult = Awaited<ReturnType<typeof simulateCalls>>;
```

Returns `readonly SimulatedWriteCall[]`.

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = simulateCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.batch.simulateCalls`](/sdk/api/batch/simulate-calls)
