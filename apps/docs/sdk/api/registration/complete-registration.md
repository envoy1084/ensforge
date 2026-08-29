---
title: completeRegistration
description: complete registration for registration and renewal.
---

# completeRegistration

complete registration for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.completeRegistration({
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  duration: 365n * 24n * 60n * 60n,
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type CompleteRegistrationParameters = Parameters<typeof sdk.registration.completeRegistration>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written.

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the method.

### duration

`bigint`

Duration in seconds.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this method.

### secret

`Bytes32`

32-byte registration secret.

### reverseRecord

`0 | 1 | 2 | undefined`

Value used for `reverseRecord` by this method.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this method.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

## Return Type

```ts
type CompleteRegistrationResult = Awaited<ReturnType<typeof sdk.registration.completeRegistration>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.completeRegistration.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.registration.completeRegistration.call(parameters);
```

## Action

- [`completeRegistration`](/core/api/actions/registration/complete-registration)
