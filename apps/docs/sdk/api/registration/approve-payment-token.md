---
title: approvePaymentToken
description: Approves payment token for registration and renewal.
---

# approvePaymentToken

Approves payment token for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.approvePaymentToken({
  paymentToken: "0x0000000000000000000000000000000000000001",
  amount: 1_000_000n,
});
```

## Parameters

```ts
type ApprovePaymentTokenParameters = Parameters<typeof sdk.registration.approvePaymentToken>[0];
```

### paymentToken

`string`

Payment token used by a supported registrar.

### amount

`bigint`

Token approval amount.

## Return Type

```ts
type ApprovePaymentTokenResult = Awaited<ReturnType<typeof sdk.registration.approvePaymentToken>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.approvePaymentToken.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.registration.approvePaymentToken.call(parameters);
```

## Action

- [`approvePaymentToken`](/core/api/actions/registration/approve-payment-token)
