---
title: getWalletCapabilities
description: Gets wallet capabilities for typed read and wallet-aware write batching.
---

# getWalletCapabilities

Gets wallet capabilities for typed read and wallet-aware write batching.

## Import

```ts
import { getWalletCapabilities } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getWalletCapabilities } from "@ensforge/core";
import { config } from "./config";

const result = await getWalletCapabilities(config, {});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetWalletCapabilitiesParameters } from "@ensforge/core";
```

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
import type { WalletCapabilitiesResult } from "@ensforge/core";
```

| Property           | Type                                                       | Description                                               |
| ------------------ | ---------------------------------------------------------- | --------------------------------------------------------- |
| `chainId`          | `number`                                                   | The chainId value returned by the operation.              |
| `nativeCalls`      | `boolean`                                                  | The nativeCalls value returned by the operation.          |
| `atomicity`        | `"unavailable" \| "supported" \| "ready" \| "unsupported"` | The atomicity value returned by the operation.            |
| `paymasterService` | `boolean`                                                  | The paymasterService value returned by the operation.     |
| `raw`              | `Readonly<Record<string, unknown>>`                        | Raw resolver bytes, or `null` when the record is not set. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getWalletCapabilities.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.batch.getWalletCapabilities`](/sdk/api/batch/get-wallet-capabilities)
