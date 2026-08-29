---
title: registerName
description: Runs the resumable commitment and registration workflow for one name.
---

# registerName

Runs the resumable commitment and registration workflow for one name.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { registerName } from "@ensforge/core";
```

## Usage

```ts
import { registerName } from "@ensforge/core";
import { config } from "./config";

const result = await registerName(config, {
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  duration: 365n * 24n * 60n * 60n,
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type RegisterNameParameters = Parameters<typeof registerName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

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

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` uses wallet capabilities and falls back safely.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

### paymentToken

`EthereumAddress | undefined`

ERC-20 token used when the registrar supports token payments.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### records

`ReadonlyArray<SetRecordInput> | undefined`

Records selected, read, or written by the operation.

### resume

`RegisterNameResult | undefined`

Previously returned progress used to continue an incomplete workflow.

## Return Type

```ts
type RegisterNameResult = Awaited<ReturnType<typeof registerName>>;
```

`RegisterNameResult`

## Effect

```ts
const effect = registerName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type RegisterNameError = Effect.Effect.Error<ReturnType<typeof registerName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
