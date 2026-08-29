---
title: getDnsRecord
description: Gets dns record for DNSSEC names and DNS resolver records.
---

# getDnsRecord

Gets dns record for DNSSEC names and DNS resolver records.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getDnsRecord } from "@ensforge/core";
```

## Usage

```ts
import { getDnsRecord } from "@ensforge/core";
import { config } from "./config";

const result = await getDnsRecord(config, {
  name: "example.eth",
  recordName: "_ens.example.com",
  resource: 1n,
});
```

## Parameters

```ts
type GetDnsRecordParameters = Parameters<typeof getDnsRecord>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### recordName

`string`

Owner name of the DNS resource record.

### resource

`DnsResource`

ENSv2 resource identifier or DNS resource type used by the action.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsRecordResult = Awaited<ReturnType<typeof getDnsRecord>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getDnsRecord.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getDnsRecord.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetDnsRecordError = Effect.Effect.Error<ReturnType<typeof getDnsRecord.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
