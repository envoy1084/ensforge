---
title: approveRenewalPayment
description: Approves renewal payment for registration and renewal.
---

# approveRenewalPayment

Approves renewal payment for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.approveRenewalPayment({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  paymentToken: "0x0000000000000000000000000000000000000001",
  amount: 1_000_000n,
});
```

## Parameters

```ts
type ApproveRenewalPaymentParameters = Parameters<typeof sdk.registration.approveRenewalPayment>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### duration

`bigint`

Duration in seconds.

### paymentToken

`string`

Payment token used by a supported registrar.

### amount

`bigint`

Token approval amount.

## Return Type

```ts
type ApproveRenewalPaymentResult = Awaited<
  ReturnType<typeof sdk.registration.approveRenewalPayment>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.approveRenewalPayment.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.registration.approveRenewalPayment.call(parameters);
```

## Action

- [`approveRenewalPayment`](/core/api/actions/registration/approve-renewal-payment)
