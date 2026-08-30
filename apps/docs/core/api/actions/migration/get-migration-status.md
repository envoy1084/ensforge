---
title: getMigrationStatus
description: Gets migration status for ENSv1 to ENSv2 migration.
---

# getMigrationStatus

Gets migration status for ENSv1 to ENSv2 migration.

## Import

```ts
import { getMigrationStatus } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getMigrationStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getMigrationStatus(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { MigrationNameParameters } from "@ensforge/core";
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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getMigrationStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getMigrationStatus.request(parameters);
```

## Error

```ts
import type { GetMigrationStatusError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.migration.getMigrationStatus`](/sdk/api/migration/get-migration-status)
