---
title: getRegistrationPlan
description: Builds the current registration plan for a name.
---

# getRegistrationPlan

Builds the current registration plan for a name.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getRegistrationPlan } from "@ensforge/core";
```

## Usage

```ts
import { getRegistrationPlan } from "@ensforge/core";
import { config } from "./config";

const result = await getRegistrationPlan(config, {
  name: "example.eth",
  duration: 365n * 24n * 60n * 60n,
  owner: "0x0000000000000000000000000000000000000001",
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type GetRegistrationPlanParameters = Parameters<typeof getRegistrationPlan>[1];
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

### paymentToken

`EthereumAddress | undefined`

ERC-20 token used when the registrar supports token payments.

## Return Type

```ts
type GetRegistrationPlanResult = Awaited<ReturnType<typeof getRegistrationPlan>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getRegistrationPlan.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getRegistrationPlan.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetRegistrationPlanError = Effect.Effect.Error<ReturnType<typeof getRegistrationPlan.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
