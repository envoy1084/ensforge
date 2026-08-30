---
title: getWalletCapabilities
description: Gets wallet capabilities for batch execution.
---

# getWalletCapabilities

Gets wallet capabilities for batch execution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.batch.getWalletCapabilities({});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetWalletCapabilitiesParameters } from "@ensforge/sdk";
```

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { WalletCapabilitiesResult } from "@ensforge/sdk";
```

| Property           | Type                                                       | Description                                               |
| ------------------ | ---------------------------------------------------------- | --------------------------------------------------------- |
| `chainId`          | `number`                                                   | The chainId value returned by the operation.              |
| `nativeCalls`      | `boolean`                                                  | The nativeCalls value returned by the operation.          |
| `atomicity`        | `"unavailable" \| "supported" \| "ready" \| "unsupported"` | The atomicity value returned by the operation.            |
| `paymasterService` | `boolean`                                                  | The paymasterService value returned by the operation.     |
| `raw`              | `Readonly<Record<string, unknown>>`                        | Raw resolver bytes, or `null` when the record is not set. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.batch.getWalletCapabilities.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getWalletCapabilities`](/core/api/actions/batch/get-wallet-capabilities)
