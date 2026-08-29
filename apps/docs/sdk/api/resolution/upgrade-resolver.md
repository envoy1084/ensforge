---
title: upgradeResolver
description: upgrade resolver for resolution and resolver lifecycle.
---

# upgradeResolver

upgrade resolver for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.resolution.upgradeResolver({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { UpgradeResolverParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### implementation

`string | undefined`

Value used for `implementation` by this method.

### data

`Hex | undefined`

Raw calldata or record bytes.

### force

`boolean | undefined`

Value used for `force` by this method.

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

## Return Type

```ts
import type { UpgradeResolverResult } from "@ensforge/sdk";
```

| Property                 | Type                                 | Description                                                 |
| ------------------------ | ------------------------------------ | ----------------------------------------------------------- |
| `status`                 | `"current" \| "upgraded"`            | Current query, transaction, batch, or workflow status.      |
| `resolver`               | `&#96;0x${string}&#96;`              | The resolver value returned by the operation.               |
| `implementation`         | `&#96;0x${string}&#96;`              | The implementation value returned by the operation.         |
| `call`                   | `null \| CallExecutionResult`        | The call value returned by the operation.                   |
| `previousImplementation` | `&#96;0x${string}&#96; \| undefined` | The previousImplementation value returned by the operation. |

## Effect

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.resolution.upgradeResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = ens.resolution.upgradeResolver.call(parameters);
```

## Error

```ts
import type { UpgradeResolverError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`upgradeResolver`](/core/api/actions/resolution/upgrade-resolver)
