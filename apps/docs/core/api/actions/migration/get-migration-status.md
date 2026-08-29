---
title: getMigrationStatus
description: Gets migration status for ENSv1 to ENSv2 migration.
---

# getMigrationStatus

Gets migration status for ENSv1 to ENSv2 migration.

This action belongs to ENSv1 to ENSv2 migration. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getMigrationStatus } from "@ensforge/core";
```

## Usage

```ts
import { getMigrationStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getMigrationStatus(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetMigrationStatusParameters = Parameters<typeof getMigrationStatus>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetMigrationStatusResult = Awaited<ReturnType<typeof getMigrationStatus>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getMigrationStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getMigrationStatus.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetMigrationStatusError = Effect.Effect.Error<ReturnType<typeof getMigrationStatus.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
