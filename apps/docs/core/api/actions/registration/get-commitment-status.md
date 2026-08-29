---
title: getCommitmentStatus
description: Gets commitment status for registration and renewal.
---

# getCommitmentStatus

Gets commitment status for registration and renewal.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getCommitmentStatus } from "@ensforge/core";
```

## Usage

```ts
import { getCommitmentStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getCommitmentStatus(config, {
  commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type GetCommitmentStatusParameters = Parameters<typeof getCommitmentStatus>[1];
```

### commitment

`Bytes32`

Registration commitment to submit or inspect.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetCommitmentStatusResult = Awaited<ReturnType<typeof getCommitmentStatus>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getCommitmentStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getCommitmentStatus.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetCommitmentStatusError = Effect.Effect.Error<ReturnType<typeof getCommitmentStatus.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
