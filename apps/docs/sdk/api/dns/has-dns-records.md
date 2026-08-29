---
title: hasDnsRecords
description: Checks whether dns records for DNS and DNSSEC.
---

# hasDnsRecords

Checks whether dns records for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.hasDnsRecords({
  name: "example.eth",
  recordName: "_ens.example.com",
});
```

## Parameters

```ts
type HasDnsRecordsParameters = Parameters<typeof sdk.dns.hasDnsRecords>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### recordName

`string`

DNS record owner name.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type HasDnsRecordsResult = Awaited<ReturnType<typeof sdk.dns.hasDnsRecords>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.hasDnsRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.dns.hasDnsRecords.request(parameters);
```

## Action

- [`hasDnsRecords`](/core/api/actions/dns/has-dns-records)
