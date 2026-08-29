---
title: getDnsClaimStatus
description: Gets dns claim status for DNSSEC names and DNS resolver records.
---

# getDnsClaimStatus

Gets dns claim status for DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getDnsClaimStatus } from "@ensforge/core";
```

## Usage

```ts
import { getDnsClaimStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getDnsClaimStatus(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetDnsClaimStatusParameters = Parameters<typeof getDnsClaimStatus>[1];
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
type GetDnsClaimStatusResult = Awaited<ReturnType<typeof getDnsClaimStatus>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getDnsClaimStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getDnsClaimStatus.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetDnsClaimStatusError = Effect.Effect.Error<ReturnType<typeof getDnsClaimStatus.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
