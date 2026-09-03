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

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.migration.getMigrationStatus({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="migration.getMigrationStatus" />

## Parameters

```ts
import type { MigrationNameParameters } from "@ensforge/sdk/migration";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetMigrationStatusResult = Awaited<ReturnType<typeof getMigrationStatus>>;
```

| Property         | Type                                                                                                                                                                                                                   | Description                                            |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `status`         | `"unsupported" \| "not-required" \| "reserved-unwrapped" \| "locked-child-pending-parent" \| "reserved-wrapped-unlocked" \| "reserved-wrapped-locked" \| "mirrored-child" \| "migrated-unlocked" \| "migrated-locked"` | Current query, transaction, batch, or workflow status. |
| `name`           | `string & Brand<"NormalizedName">`                                                                                                                                                                                     | Normalized ENS name.                                   |
| `reason`         | `"ENSV2_NOT_ACTIVE" \| "NOT_ETH_NAME" \| "NAME_NOT_RESERVED" \| "V2_NATIVE" \| "AVAILABLE" \| undefined`                                                                                                               | The reason value returned by the operation.            |
| `parent`         | `string & Brand<"NormalizedName"> \| undefined`                                                                                                                                                                        | The parent value returned by the operation.            |
| `fuses`          | `number \| undefined`                                                                                                                                                                                                  | The fuses value returned by the operation.             |
| `parentRegistry` | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                   | The parentRegistry value returned by the operation.    |
| `registry`       | `&#96;0x${string}&#96; \| undefined`                                                                                                                                                                                   | The registry value returned by the operation.          |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.migration.getMigrationStatus.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.migration.getMigrationStatus.request(parameters);
```

## Error

```ts
import type { GetMigrationStatusError } from "@ensforge/sdk/migration";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getMigrationStatus`](/core/api/actions/migration/get-migration-status)
