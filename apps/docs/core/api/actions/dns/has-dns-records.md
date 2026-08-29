---
title: hasDnsRecords
description: Checks whether dns records for DNSSEC names and DNS resolver records.
---

# hasDnsRecords

Checks whether dns records for DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { hasDnsRecords } from "@ensforge/core";
```

## Usage

```ts
import { hasDnsRecords } from "@ensforge/core";
import { config } from "./config";

const result = await hasDnsRecords(config, {
  name: "example.eth",
  recordName: "_ens.example.com",
});
```

## Parameters

```ts
type HasDnsRecordsParameters = Parameters<typeof hasDnsRecords>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### recordName

`string`

Owner name of the DNS resource record.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type HasDnsRecordsResult = Awaited<ReturnType<typeof hasDnsRecords>>;
```

`{ readonly name: string & Brand<"NormalizedName">; readonly recordName: string & Brand<"NormalizedName">; readonly resolver: `0x${string}` | null; readonly exists: boolean; }`

## Effect

```ts
const effect = hasDnsRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = hasDnsRecords.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type HasDnsRecordsError = Effect.Effect.Error<ReturnType<typeof hasDnsRecords.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
