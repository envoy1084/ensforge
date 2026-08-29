---
title: setDnsRecords
description: Sets dns records for DNS and DNSSEC.
---

# setDnsRecords

Sets dns records for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.dns.setDnsRecords({
  name: "example.eth",
  data: "0x",
});
```

## Parameters

```ts
type SetDnsRecordsParameters = Parameters<typeof sdk.dns.setDnsRecords>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### data

`Hex`

Raw calldata or record bytes.

## Return Type

```ts
type SetDnsRecordsResult = Awaited<ReturnType<typeof sdk.dns.setDnsRecords>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.dns.setDnsRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.dns.setDnsRecords.call(parameters);
```

## Action

- [`setDnsRecords`](/core/api/actions/dns/set-dns-records)
