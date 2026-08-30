---
title: getMigrationEligibility
description: Gets migration eligibility for name migration.
---

# getMigrationEligibility

Gets migration eligibility for name migration.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.migration.getMigrationEligibility({
  name: "example.eth",
  account: {},
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetMigrationEligibilityParameters } from "@ensforge/sdk/migration";
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

### account

`EthereumAddress`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

## Return Type

```ts
type GetMigrationEligibilityResult = Awaited<ReturnType<typeof getMigrationEligibility>>;
```

| Property     | Type                                                                                                                                                                                                                                                               | Description                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `name`       | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                 | Normalized ENS name.                                         |
| `eligible`   | `boolean`                                                                                                                                                                                                                                                          | The eligible value returned by the operation.                |
| `status`     | `{ readonly status: "unsupported"; readonly name: string & Brand<"NormalizedName">; readonly reason: "ENSV2_NOT_ACTIVE" \| "NOT_ETH_NAME" \| "NAME_NOT_RESERVED"; } \| { ...; } \| ... 6 more ... \| { ...; }`                                                     | Current query, transaction, batch, or workflow status.       |
| `target`     | `{ readonly supported: false; readonly name: string & Brand<"NormalizedName">; readonly reason: "MIGRATION_UNSUPPORTED" \| "MIGRATION_NOT_REQUIRED" \| "PARENT_NOT_MIGRATED"; } \| { ...; }`                                                                       | The target value returned by the operation.                  |
| `account`    | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                            | The account value returned by the operation.                 |
| `owner`      | `&#96;0x${string}&#96; \| null`                                                                                                                                                                                                                                    | Current owner address, or `null` when the name has no owner. |
| `authorized` | `boolean`                                                                                                                                                                                                                                                          | The authorized value returned by the operation.              |
| `blockers`   | `readonly ("ENSV2_NOT_ACTIVE" \| "NOT_ETH_NAME" \| "NAME_NOT_RESERVED" \| "PARENT_NOT_MIGRATED" \| "NAME_ALREADY_MIGRATED" \| "NAME_AVAILABLE" \| "ACCOUNT_NOT_OWNER_OR_OPERATOR" \| "INVALID_WRAPPER_STATE" \| "FROZEN_TOKEN_APPROVAL" \| "TRANSFER_DISABLED")[]` | The blockers value returned by the operation.                |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.migration.getMigrationEligibility.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.migration.getMigrationEligibility.request(parameters);
```

## Error

```ts
import type { GetMigrationEligibilityError } from "@ensforge/sdk/migration";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getMigrationEligibility`](/core/api/actions/migration/get-migration-eligibility)
