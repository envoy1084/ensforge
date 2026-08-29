---
title: getMigrationStatus
description: Gets migration status for name migration.
---

# getMigrationStatus

Gets migration status for name migration.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.migration.getMigrationStatus({
  name: "example.eth",
});
```

## Parameters

```ts
type GetMigrationStatusParameters = Parameters<typeof sdk.migration.getMigrationStatus>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetMigrationStatusResult = Awaited<ReturnType<typeof sdk.migration.getMigrationStatus>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.migration.getMigrationStatus.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.migration.getMigrationStatus.request(parameters);
```

## Action

- [`getMigrationStatus`](/core/api/actions/migration/get-migration-status)
