---
title: renewName
description: Renews one name through its active ENSv1 or ENSv2 route.
---

# renewName

Renews one name through its active ENSv1 or ENSv2 route.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { renewName } from "@ensforge/core";
```

## Usage

```ts
import { renewName } from "@ensforge/core";
import { config } from "./config";

const result = await renewName(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

## Parameters

```ts
type RenewNameParameters = Parameters<typeof renewName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### duration

`bigint`

Duration in seconds.

### paymentToken

`EthereumAddress | undefined`

ERC-20 token used when the registrar supports token payments.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### referrer

`Bytes32 | undefined`

Optional protocol-specific referral identifier.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` uses wallet capabilities and falls back safely.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### resume

`RenewNameResult | undefined`

Previously returned progress used to continue an incomplete workflow.

## Return Type

```ts
type RenewNameResult = Awaited<ReturnType<typeof renewName>>;
```

`RenewNameResult`

## Effect

```ts
const effect = renewName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = renewName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type RenewNameError = Effect.Effect.Error<ReturnType<typeof renewName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
