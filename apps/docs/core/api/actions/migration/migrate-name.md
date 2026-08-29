---
title: migrateName
description: Runs the resumable workflow that migrates one name to ENSv2.
---

# migrateName

Runs the resumable workflow that migrates one name to ENSv2.

This action belongs to ENSv1 to ENSv2 migration. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { migrateName } from "@ensforge/core";
```

## Usage

```ts
import { migrateName } from "@ensforge/core";
import { config } from "./config";

const result = await migrateName(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type MigrateNameParameters = Parameters<typeof migrateName>[1];
```

### migrateParent

`boolean | undefined`

Value used for `migrateParent` by this action.

### resume

`MigrationNameProgress | undefined`

Previously returned progress used to continue an incomplete workflow.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### owner

`EthereumAddress | undefined`

Address that should own the resulting name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the operation.

### subregistry

`EthereumAddress | undefined`

ENSv2 subregistry assigned during registration.

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

## Return Type

```ts
type MigrateNameResult = Awaited<ReturnType<typeof migrateName>>;
```

`MigrateNameResult`

## Effect

```ts
const effect = migrateName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = migrateName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type MigrateNameError = Effect.Effect.Error<ReturnType<typeof migrateName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
