---
title: getCommitmentStatus
description: Gets commitment status for registration and renewal.
---

# getCommitmentStatus

Gets commitment status for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.registration.getCommitmentStatus({
  commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetCommitmentStatusParameters } from "@ensforge/sdk";
```

### commitment

`Bytes32`

Registration commitment.

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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.registration.getCommitmentStatus.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.registration.getCommitmentStatus.request(parameters);
```

## Error

```ts
import type { GetCommitmentStatusError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getCommitmentStatus`](/core/api/actions/registration/get-commitment-status)
