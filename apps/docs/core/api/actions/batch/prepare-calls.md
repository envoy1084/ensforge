---
title: prepareCalls
description: Resolves authorization and simulates ENS write intents without submitting them.
---

# prepareCalls

Resolves authorization and simulates ENS write intents without submitting them.

## Import

```ts
import { prepareCalls } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { prepareCalls } from "@ensforge/core";
import { config } from "./config";

const result = await prepareCalls(config, {
  calls: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { PrepareCallsParameters } from "@ensforge/core";
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
type PrepareCallsResult = Awaited<ReturnType<typeof prepareCalls>>;
```

Returns `readonly PreparedWriteCall[]`.

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = prepareCalls.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.batch.prepareCalls`](/sdk/api/batch/prepare-calls)
