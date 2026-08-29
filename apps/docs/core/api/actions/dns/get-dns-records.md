---
title: getDnsRecords
description: Gets dns records for DNSSEC names and DNS resolver records.
---

# getDnsRecords

Gets dns records for DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getDnsRecords } from "@ensforge/core";
```

## Usage

```ts
import { getDnsRecords } from "@ensforge/core";
import { config } from "./config";

const result = await getDnsRecords(config, {
  name: "example.eth",
  records: [],
});
```

## Parameters

```ts
type GetDnsRecordsParameters = Parameters<typeof getDnsRecords>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### records

`ReadonlyArray<DnsRecordQuery>`

Records selected, read, or written by the operation.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsRecordsResult = Awaited<ReturnType<typeof getDnsRecords>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getDnsRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getDnsRecords.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetDnsRecordsError = Effect.Effect.Error<ReturnType<typeof getDnsRecords.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
