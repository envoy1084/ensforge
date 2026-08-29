---
title: upgradeResolver
description: Upgrades resolver through resolver discovery and Universal Resolver calls.
---

# upgradeResolver

Upgrades resolver through resolver discovery and Universal Resolver calls.

## Import

```ts
import { upgradeResolver } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { upgradeResolver } from "@ensforge/core";
import { config } from "./config";

const result = await upgradeResolver(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { UpgradeResolverParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### implementation

`string | undefined`

Resolver implementation used by an upgrade.

### data

`Hex | undefined`

Raw calldata or resolver bytes.

### force

`boolean | undefined`

Allows execution when the normal no-op guard would stop the operation.

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
import type { UpgradeResolverResult } from "@ensforge/core";
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

const program = upgradeResolver.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = upgradeResolver.call(parameters);
```

## Error

```ts
import type { UpgradeResolverError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.resolution.upgradeResolver`](/sdk/api/resolution/upgrade-resolver)
