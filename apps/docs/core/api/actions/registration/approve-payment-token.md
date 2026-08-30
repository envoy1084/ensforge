---
title: approvePaymentToken
description: Approves payment token for registration and renewal.
---

# approvePaymentToken

Approves payment token for registration and renewal.

## Import

```ts
import { approvePaymentToken } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { approvePaymentToken } from "@ensforge/core";
import { config } from "./config";

const result = await approvePaymentToken(config, {
  paymentToken: "0x0000000000000000000000000000000000000001",
  amount: 1_000_000n,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { ApprovePaymentTokenParameters } from "@ensforge/core";
```

### paymentToken

`string`

ERC-20 token used when the registrar supports token payments.

### amount

`bigint`

Token amount approved by the operation.

## Return Type

```ts
import type { CallExecutionResult } from "@ensforge/core";
```

| Property    | Type                                          | Description                                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `id`        | `string`                                      | Stable operation or wallet batch identifier.                                   |
| `operation` | `string`                                      | The operation value returned by the operation.                                 |
| `status`    | `"not-started" \| "submitted" \| "confirmed"` | Current query, transaction, batch, or workflow status.                         |
| `hash`      | `null \| &#96;0x${string}&#96; \| null`       | Transaction hash, or `null` before submission.                                 |
| `receipt`   | `null \| WriteReceipt \| null`                | Normalized transaction receipt, or `null` when confirmation was not requested. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = approvePaymentToken.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = approvePaymentToken.call(parameters);
```

## Error

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.approvePaymentToken`](/sdk/api/registration/approve-payment-token)
