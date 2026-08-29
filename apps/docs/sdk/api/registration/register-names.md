---
title: registerNames
description: Runs resumable registration workflows for multiple names.
---

# registerNames

Runs resumable registration workflows for multiple names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.registration.registerNames({
  registrations: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { RegisterNamesParameters } from "@ensforge/sdk";
```

### registrations

`ReadonlyArray<RegisterNamesEntryParameters>`

Registration entries.

### resume

`RegisterNamesResult | undefined`

Previously returned progress used to continue the workflow.

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
import type { RegisterNamesResult } from "@ensforge/sdk";
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
import { ens } from "./client";

const program = ens.registration.registerNames.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`registerNames`](/core/api/actions/registration/register-names)
