---
title: getDnsRecord
description: Gets dns record for DNS and DNSSEC.
---

# getDnsRecord

Gets dns record for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.getDnsRecord({
  name: "example.eth",
  recordName: "_ens.example.com",
  resource: 1n,
});
```

## Parameters

```ts
type GetDnsRecordParameters = Parameters<typeof sdk.dns.getDnsRecord>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### recordName

`string`

DNS record owner name.

### resource

`DnsResource`

ENSv2 resource identifier or DNS resource type.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsRecordResult = Awaited<ReturnType<typeof sdk.dns.getDnsRecord>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.getDnsRecord.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.dns.getDnsRecord.request(parameters);
```

## Action

- [`getDnsRecord`](/core/api/actions/dns/get-dns-record)
