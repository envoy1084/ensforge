---
title: approvePaymentToken
description: Approves payment token for registration and renewal.
---

# approvePaymentToken

Approves payment token for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { approvePaymentToken } from "@ensforge/core";
```

## Usage

```ts
import { approvePaymentToken } from "@ensforge/core";
import { config } from "./config";

const result = await approvePaymentToken(config, {
  paymentToken: "0x0000000000000000000000000000000000000001",
  amount: 1_000_000n,
});
```

## Parameters

```ts
type ApprovePaymentTokenParameters = Parameters<typeof approvePaymentToken>[1];
```

### paymentToken

`string`

ERC-20 token used when the registrar supports token payments.

### amount

`bigint`

Token amount approved by the operation.

## Return Type

```ts
type ApprovePaymentTokenResult = Awaited<ReturnType<typeof approvePaymentToken>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = approvePaymentToken.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = approvePaymentToken.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ApprovePaymentTokenError = Effect.Effect.Error<ReturnType<typeof approvePaymentToken.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
