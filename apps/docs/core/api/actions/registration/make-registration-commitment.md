---
title: makeRegistrationCommitment
description: make registration commitment for registration and renewal.
---

# makeRegistrationCommitment

make registration commitment for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { makeRegistrationCommitment } from "@ensforge/core";
```

## Usage

```ts
import { makeRegistrationCommitment } from "@ensforge/core";
import { config } from "./config";

const result = await makeRegistrationCommitment(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  owner: "0x0000000000000000000000000000000000000001",
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type MakeRegistrationCommitmentParameters = Parameters<typeof makeRegistrationCommitment>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

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

32-byte secret used to construct a registration commitment.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

ENSv2 subregistry assigned during registration.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written by the operation.

### reverseRecord

`0 | 1 | 2 | undefined`

Reverse-record behavior requested during registration.

### referrer

`Bytes32 | undefined`

Optional protocol-specific referral identifier.

## Return Type

```ts
type MakeRegistrationCommitmentResult = Awaited<ReturnType<typeof makeRegistrationCommitment>>;
```

`{ readonly name: string & Brand<"NormalizedName">; readonly protocol: "v1" | "v2"; readonly registrar: `0x${string}`; readonly commitment: `0x${string}`; }`

## Effect

```ts
const effect = makeRegistrationCommitment.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = makeRegistrationCommitment.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type MakeRegistrationCommitmentError = Effect.Effect.Error<
  ReturnType<typeof makeRegistrationCommitment.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
