---
title: isPaymentTokenSupported
description: Checks whether payment token supported for registration and renewal.
---

# isPaymentTokenSupported

Checks whether payment token supported for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.isPaymentTokenSupported({
  paymentToken: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type IsPaymentTokenSupportedParameters = Parameters<
  typeof sdk.registration.isPaymentTokenSupported
>[0];
```

### paymentToken

`EthereumAddress`

Payment token used by a supported registrar.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type IsPaymentTokenSupportedResult = Awaited<
  ReturnType<typeof sdk.registration.isPaymentTokenSupported>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.isPaymentTokenSupported.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.registration.isPaymentTokenSupported.request(parameters);
```

## Action

- [`isPaymentTokenSupported`](/core/api/actions/registration/is-payment-token-supported)
