---
title: registerNames
description: Runs resumable registration workflows for multiple names.
---

# registerNames

Runs resumable registration workflows for multiple names.

## Import

```ts
import { registerNames } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { registerNames } from "@ensforge/core";
import { config } from "./config";

const result = await registerNames(config, {
  registrations: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { RegisterNamesParameters } from "@ensforge/core";
```

### registrations

`ReadonlyArray<RegisterNamesEntryParameters>`

Registration entries executed by the batch workflow.

### resume

`RegisterNamesResult | undefined`

Previously returned progress used to continue an incomplete workflow.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

## Return Type

```ts
import type { RegisterNamesResult } from "@ensforge/core";
```

| Property        | Type                                                   | Description                                            |
| --------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| `status`        | `"completed" \| "waiting" \| "partial" \| "submitted"` | Current query, transaction, batch, or workflow status. |
| `registrations` | `readonly RegisterNameResult[]`                        | The registrations value returned by the operation.     |
| `nextActionAt`  | `bigint \| null`                                       | The nextActionAt value returned by the operation.      |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = registerNames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.registration.registerNames`](/sdk/api/registration/register-names)
