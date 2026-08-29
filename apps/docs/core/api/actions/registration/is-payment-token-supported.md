---
title: isPaymentTokenSupported
description: Checks whether payment token supported for registration and renewal.
---

# isPaymentTokenSupported

Checks whether payment token supported for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { isPaymentTokenSupported } from "@ensforge/core";
```

## Usage

```ts
import { isPaymentTokenSupported } from "@ensforge/core";
import { config } from "./config";

const result = await isPaymentTokenSupported(config, {
  paymentToken: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type IsPaymentTokenSupportedParameters = Parameters<typeof isPaymentTokenSupported>[1];
```

### paymentToken

`EthereumAddress`

ERC-20 token used when the registrar supports token payments.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type IsPaymentTokenSupportedResult = Awaited<ReturnType<typeof isPaymentTokenSupported>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = isPaymentTokenSupported.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = isPaymentTokenSupported.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type IsPaymentTokenSupportedError = Effect.Effect.Error<
  ReturnType<typeof isPaymentTokenSupported.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
