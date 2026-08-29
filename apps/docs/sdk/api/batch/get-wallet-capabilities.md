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

```ts
import { sdk } from "./sdk";

const result = await sdk.batch.getWalletCapabilities({});
```

## Parameters

```ts
type GetWalletCapabilitiesParameters = Parameters<typeof sdk.batch.getWalletCapabilities>[0];
```

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

```ts
type GetWalletCapabilitiesResult = Awaited<ReturnType<typeof sdk.batch.getWalletCapabilities>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.batch.getWalletCapabilities.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`getWalletCapabilities`](/core/api/actions/batch/get-wallet-capabilities)
