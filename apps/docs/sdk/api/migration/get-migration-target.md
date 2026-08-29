---
title: getMigrationTarget
description: Gets migration target for name migration.
---

# getMigrationTarget

Gets migration target for name migration.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.migration.getMigrationTarget({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { MigrationNameParameters } from "@ensforge/sdk";
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.migration.getMigrationTarget.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.migration.getMigrationTarget.request(parameters);
```

## Error

```ts
import type { GetMigrationTargetError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getMigrationTarget`](/core/api/actions/migration/get-migration-target)
