---
title: makeRegistrationCommitment
description: make registration commitment for registration and renewal.
---

# makeRegistrationCommitment

make registration commitment for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.makeRegistrationCommitment({
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  owner: "0x0000000000000000000000000000000000000001",
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type MakeRegistrationCommitmentParameters = Parameters<
  typeof sdk.registration.makeRegistrationCommitment
>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### duration

`bigint`

Duration in seconds.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### secret

`Bytes32`

32-byte registration secret.

### resolver

`EthereumAddress | undefined`

Resolver address used by the method.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this method.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written.

### reverseRecord

`0 | 1 | 2 | undefined`

Value used for `reverseRecord` by this method.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this method.

## Return Type

```ts
type MakeRegistrationCommitmentResult = Awaited<
  ReturnType<typeof sdk.registration.makeRegistrationCommitment>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.makeRegistrationCommitment.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.registration.makeRegistrationCommitment.request(parameters);
```

## Action

- [`makeRegistrationCommitment`](/core/api/actions/registration/make-registration-commitment)
