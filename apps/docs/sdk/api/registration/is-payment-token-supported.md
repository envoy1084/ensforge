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

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.registration.isPaymentTokenSupported({
  paymentToken: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { IsPaymentTokenSupportedParameters } from "@ensforge/sdk";
```

### paymentToken

`EthereumAddress`

Payment token used by a supported registrar.

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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.registration.isPaymentTokenSupported.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.registration.isPaymentTokenSupported.request(parameters);
```

## Error

```ts
import type { IsPaymentTokenSupportedError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`isPaymentTokenSupported`](/core/api/actions/registration/is-payment-token-supported)
