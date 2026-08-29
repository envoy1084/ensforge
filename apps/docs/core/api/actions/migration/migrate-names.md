---
title: migrateNames
description: Runs a resumable migration workflow for multiple names.
---

# migrateNames

Runs a resumable migration workflow for multiple names.

This action belongs to ENSv1 to ENSv2 migration. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { migrateNames } from "@ensforge/core";
```

## Usage

```ts
import { migrateNames } from "@ensforge/core";
import { config } from "./config";

const result = await migrateNames(config, {
  migrations: [],
});
```

## Parameters

```ts
type MigrateNamesParameters = Parameters<typeof migrateNames>[1];
```

### migrations

`ReadonlyArray<MigrateNameCallParameters>`

Migration entries executed by the batch workflow.

### resume

`MigrationBatchProgress | undefined`

Previously returned progress used to continue an incomplete workflow.

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
type MigrateNamesResult = Awaited<ReturnType<typeof migrateNames>>;
```

`MigrationBatchProgress`

## Effect

```ts
const effect = migrateNames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type MigrateNamesError = Effect.Effect.Error<ReturnType<typeof migrateNames.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
