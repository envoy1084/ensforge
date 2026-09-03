---
title: isPaymentTokenSupported
description: Checks whether payment token supported for registration and renewal.
---

# isPaymentTokenSupported

Checks whether payment token supported for registration and renewal.

## Import

```ts
import { isPaymentTokenSupported } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { isPaymentTokenSupported } from "@ensforge/core";
import { config } from "./config";

const result = await isPaymentTokenSupported(config, {
  paymentToken: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="registration.isPaymentTokenSupported" />

## Parameters

```ts
import type { IsPaymentTokenSupportedParameters } from "@ensforge/core";
```

### paymentToken

`EthereumAddress`

ERC-20 token used when the registrar supports token payments.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type IsPaymentTokenSupportedResult = Awaited<ReturnType<typeof isPaymentTokenSupported>>;
```

| Property    | Type                                                                  | Description                                            |
| ----------- | --------------------------------------------------------------------- | ------------------------------------------------------ |
| `protocol`  | `"v1" \| "v2"`                                                        | ENS protocol route used for the result.                |
| `supported` | `false \| true`                                                       | Whether the selected protocol supports this operation. |
| `reason`    | `"NATIVE_PAYMENT_ONLY" \| "PAYMENT_TOKEN_NOT_SUPPORTED" \| undefined` | The reason value returned by the operation.            |
| `token`     | `&#96;0x${string}&#96; \| undefined`                                  | The token value returned by the operation.             |
| `symbol`    | `string \| undefined`                                                 | The symbol value returned by the operation.            |
| `decimals`  | `number \| undefined`                                                 | The decimals value returned by the operation.          |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = isPaymentTokenSupported.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = isPaymentTokenSupported.request(parameters);
```

## Error

```ts
import type { IsPaymentTokenSupportedError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.isPaymentTokenSupported`](/sdk/api/registration/is-payment-token-supported)
