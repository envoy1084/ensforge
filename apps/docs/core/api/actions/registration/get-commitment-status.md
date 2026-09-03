---
title: getCommitmentStatus
description: Gets commitment status for registration and renewal.
---

# getCommitmentStatus

Gets commitment status for registration and renewal.

## Import

```ts
import { getCommitmentStatus } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getCommitmentStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getCommitmentStatus(config, {
  commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="registration.getCommitmentStatus" />

## Parameters

```ts
import type { GetCommitmentStatusParameters } from "@ensforge/core";
```

### commitment

`Bytes32`

Registration commitment to submit or inspect.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetCommitmentStatusResult = Awaited<ReturnType<typeof getCommitmentStatus>>;
```

| Property           | Type                                               | Description                                            |
| ------------------ | -------------------------------------------------- | ------------------------------------------------------ |
| `status`           | `"not-found" \| "pending" \| "ready" \| "expired"` | Current query, transaction, batch, or workflow status. |
| `protocol`         | `"v1" \| "v2"`                                     | ENS protocol route used for the result.                |
| `submittedAt`      | `bigint \| undefined`                              | The submittedAt value returned by the operation.       |
| `readyAt`          | `bigint \| undefined`                              | The readyAt value returned by the operation.           |
| `expiresAt`        | `bigint \| undefined`                              | The expiresAt value returned by the operation.         |
| `remainingSeconds` | `bigint \| undefined`                              | The remainingSeconds value returned by the operation.  |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getCommitmentStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getCommitmentStatus.request(parameters);
```

## Error

```ts
import type { GetCommitmentStatusError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.getCommitmentStatus`](/sdk/api/registration/get-commitment-status)
