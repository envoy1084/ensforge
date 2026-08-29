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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = getCommitmentStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getCommitmentStatus.request(parameters);
```

## Error

```ts
import type { GetCommitmentStatusError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.registration.getCommitmentStatus`](/sdk/api/registration/get-commitment-status)
