---
title: getDnsRecords
description: Gets dns records for DNS and DNSSEC.
---

# getDnsRecords

Gets dns records for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.getDnsRecords({
  name: "example.eth",
  records: [],
});
```

## Parameters

```ts
type GetDnsRecordsParameters = Parameters<typeof sdk.dns.getDnsRecords>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### records

`ReadonlyArray<DnsRecordQuery>`

Records selected, read, or written.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsRecordsResult = Awaited<ReturnType<typeof sdk.dns.getDnsRecords>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.getDnsRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.dns.getDnsRecords.request(parameters);
```

## Action

- [`getDnsRecords`](/core/api/actions/dns/get-dns-records)
