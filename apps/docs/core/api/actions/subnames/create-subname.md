---
title: createSubname
description: Creates subname for subname management.
---

# createSubname

Creates subname for subname management.

This action belongs to subname management. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { createSubname } from "@ensforge/core";
```

## Usage

```ts
import { createSubname } from "@ensforge/core";
import { config } from "./config";

const result = await createSubname(config, {
  owner: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type CreateSubnameParameters = Parameters<typeof createSubname>[1];
```

### owner

`string`

Address that should own the resulting name or resource.

### resolver

`string | undefined`

Resolver address used by the operation.

### ttl

`bigint | undefined`

Registry time-to-live in seconds.

### expiry

`bigint | undefined`

Unix timestamp for the requested expiry.

### fuses

`number | undefined`

Value used for `fuses` by this action.

### roles

`bigint | undefined`

Role bitmask to read, grant, or revoke.

### salt

`bigint | undefined`

Deterministic deployment salt.

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

### resume

`CreateSubnameResult | undefined`

Previously returned progress used to continue an incomplete workflow.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type CreateSubnameResult = Awaited<ReturnType<typeof createSubname>>;
```

`CreateSubnameResult`

## Effect

```ts
const effect = createSubname.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type CreateSubnameError = Effect.Effect.Error<ReturnType<typeof createSubname.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
