---
title: renewName
description: Renews one name through its active protocol route.
---

# renewName

Renews one name through its active protocol route.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.renewName({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
});
```

## Parameters

```ts
type RenewNameParameters = Parameters<typeof sdk.registration.renewName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### duration

`bigint`

Duration in seconds.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this method.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`RenewNameResult | undefined`

Previously returned progress used to continue the workflow.

## Return Type

```ts
type RenewNameResult = Awaited<ReturnType<typeof sdk.registration.renewName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.renewName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.registration.renewName.call(parameters);
```

## Action

- [`renewName`](/core/api/actions/registration/renew-name)
