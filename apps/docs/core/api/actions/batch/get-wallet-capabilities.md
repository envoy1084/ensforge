---
title: getWalletCapabilities
description: Gets wallet capabilities for typed read and wallet-aware write batching.
---

# getWalletCapabilities

Gets wallet capabilities for typed read and wallet-aware write batching.

This action belongs to typed read and wallet-aware write batching. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getWalletCapabilities } from "@ensforge/core";
```

## Usage

```ts
import { getWalletCapabilities } from "@ensforge/core";
import { config } from "./config";

const result = await getWalletCapabilities(config, {});
```

## Parameters

```ts
type GetWalletCapabilitiesParameters = Parameters<typeof getWalletCapabilities>[1];
```

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

## Return Type

```ts
type GetWalletCapabilitiesResult = Awaited<ReturnType<typeof getWalletCapabilities>>;
```

`WalletCapabilitiesResult`

## Effect

```ts
const effect = getWalletCapabilities.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type GetWalletCapabilitiesError = Effect.Effect.Error<
  ReturnType<typeof getWalletCapabilities.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
