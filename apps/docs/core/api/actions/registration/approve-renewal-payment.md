---
title: approveRenewalPayment
description: Approves renewal payment for registration and renewal.
---

# approveRenewalPayment

Approves renewal payment for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { approveRenewalPayment } from "@ensforge/core";
```

## Usage

```ts
import { approveRenewalPayment } from "@ensforge/core";
import { config } from "./config";

const result = await approveRenewalPayment(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  paymentToken: "0x0000000000000000000000000000000000000001",
  amount: 1_000_000n,
});
```

## Parameters

```ts
type ApproveRenewalPaymentParameters = Parameters<typeof approveRenewalPayment>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### duration

`bigint`

Duration in seconds.

### paymentToken

`string`

ERC-20 token used when the registrar supports token payments.

### amount

`bigint`

Token amount approved by the operation.

## Return Type

```ts
type ApproveRenewalPaymentResult = Awaited<ReturnType<typeof approveRenewalPayment>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = approveRenewalPayment.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = approveRenewalPayment.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ApproveRenewalPaymentError = Effect.Effect.Error<
  ReturnType<typeof approveRenewalPayment.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
