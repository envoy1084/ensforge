---
title: completeRegistration
description: complete registration for registration and renewal.
---

# completeRegistration

complete registration for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { completeRegistration } from "@ensforge/core";
```

## Usage

```ts
import { completeRegistration } from "@ensforge/core";
import { config } from "./config";

const result = await completeRegistration(config, {
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  duration: 365n * 24n * 60n * 60n,
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type CompleteRegistrationParameters = Parameters<typeof completeRegistration>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written by the operation.

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### duration

`bigint`

Duration in seconds.

### subregistry

`EthereumAddress | undefined`

ENSv2 subregistry assigned during registration.

### secret

`Bytes32`

32-byte secret used to construct a registration commitment.

### reverseRecord

`0 | 1 | 2 | undefined`

Reverse-record behavior requested during registration.

### referrer

`Bytes32 | undefined`

Optional protocol-specific referral identifier.

### paymentToken

`EthereumAddress | undefined`

ERC-20 token used when the registrar supports token payments.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

## Return Type

```ts
type CompleteRegistrationResult = Awaited<ReturnType<typeof completeRegistration>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = completeRegistration.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = completeRegistration.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type CompleteRegistrationError = Effect.Effect.Error<
  ReturnType<typeof completeRegistration.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
