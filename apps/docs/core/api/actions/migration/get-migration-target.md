---
title: getMigrationTarget
description: Gets migration target for ENSv1 to ENSv2 migration.
---

# getMigrationTarget

Gets migration target for ENSv1 to ENSv2 migration.

## Import

```ts
import { getMigrationTarget } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getMigrationTarget } from "@ensforge/core";
import { config } from "./config";

const result = await getMigrationTarget(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="migration.getMigrationTarget" />

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
type GetMigrationTargetResult = Awaited<ReturnType<typeof getMigrationTarget>>;
```

| Property        | Type                                                                                        | Description                                            |
| --------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `supported`     | `false \| true`                                                                             | Whether the selected protocol supports this operation. |
| `name`          | `string & Brand<"NormalizedName">`                                                          | Normalized ENS name.                                   |
| `reason`        | `"MIGRATION_UNSUPPORTED" \| "MIGRATION_NOT_REQUIRED" \| "PARENT_NOT_MIGRATED" \| undefined` | The reason value returned by the operation.            |
| `route`         | `"unwrapped" \| "wrapped-unlocked" \| "wrapped-locked" \| "locked-child" \| undefined`      | The route value returned by the operation.             |
| `tokenContract` | `&#96;0x${string}&#96; \| undefined`                                                        | The tokenContract value returned by the operation.     |
| `tokenId`       | `bigint \| undefined`                                                                       | The tokenId value returned by the operation.           |
| `tokenStandard` | `"erc721" \| "erc1155" \| undefined`                                                        | The tokenStandard value returned by the operation.     |
| `receiver`      | `&#96;0x${string}&#96; \| undefined`                                                        | The receiver value returned by the operation.          |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getMigrationTarget.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getMigrationTarget.request(parameters);
```

## Error

```ts
import type { GetMigrationTargetError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.migration.getMigrationTarget`](/sdk/api/migration/get-migration-target)
