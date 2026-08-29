---
title: setSubnameRecord
description: Sets subname record for subname management.
---

# setSubnameRecord

Sets subname record for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.subnames.setSubnameRecord({
  owner: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetSubnameRecordParameters = Parameters<typeof sdk.subnames.setSubnameRecord>[0];
```

### records

`ReadonlyArray<SetRecordInput> | undefined`

Records selected, read, or written.

### owner

`string`

Address that should own the resulting name or resource.

### resolver

`string | undefined`

Resolver address used by the method.

### ttl

`bigint | undefined`

Registry time-to-live in seconds.

### expiry

`bigint | undefined`

Unix timestamp for the requested expiry.

### fuses

`number | undefined`

Value used for `fuses` by this method.

### roles

`bigint | undefined`

Role bitmask to inspect, grant, or revoke.

### salt

`bigint | undefined`

Value used for `salt` by this method.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`CreateSubnameResult | undefined`

Previously returned progress used to continue the workflow.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type SetSubnameRecordResult = Awaited<ReturnType<typeof sdk.subnames.setSubnameRecord>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.subnames.setSubnameRecord.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`setSubnameRecord`](/core/api/actions/subnames/set-subname-record)
