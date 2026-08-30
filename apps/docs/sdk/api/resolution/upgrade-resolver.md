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
import { sdk } from "./client";

const result = await sdk.resolution.upgradeResolver({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { UpgradeResolverParameters } from "@ensforge/sdk/resolution";
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
import type { UpgradeResolverResult } from "@ensforge/sdk/resolution";
```

| Property                 | Type                                 | Description                                                 |
| ------------------------ | ------------------------------------ | ----------------------------------------------------------- |
| `status`                 | `"current" \| "upgraded"`            | Current query, transaction, batch, or workflow status.      |
| `resolver`               | `&#96;0x${string}&#96;`              | The resolver value returned by the operation.               |
| `implementation`         | `&#96;0x${string}&#96;`              | The implementation value returned by the operation.         |
| `call`                   | `null \| CallExecutionResult`        | The call value returned by the operation.                   |
| `previousImplementation` | `&#96;0x${string}&#96; \| undefined` | The previousImplementation value returned by the operation. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.resolution.upgradeResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.resolution.upgradeResolver.call(parameters);
```

## Error

```ts
import type { UpgradeResolverError } from "@ensforge/sdk/resolution";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`upgradeResolver`](/core/api/actions/resolution/upgrade-resolver)
