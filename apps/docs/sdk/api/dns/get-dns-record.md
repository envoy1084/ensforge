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

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.dns.getDnsRecord({
  name: "example.eth",
  recordName: "_ens.example.com",
  resource: 1n,
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="dns.getDnsRecord" />

## Parameters

```ts
import type { GetDnsRecordParameters } from "@ensforge/sdk/dns";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

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

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsRecordResult = Awaited<ReturnType<typeof getDnsRecord>>;
```

| Property     | Type                               | Description                                         |
| ------------ | ---------------------------------- | --------------------------------------------------- |
| `name`       | `string & Brand<"NormalizedName">` | Normalized ENS name.                                |
| `recordName` | `string & Brand<"NormalizedName">` | The recordName value returned by the operation.     |
| `resource`   | `number`                           | The resource value returned by the operation.       |
| `resolver`   | `&#96;0x${string}&#96; \| null`    | The resolver value returned by the operation.       |
| `value`      | `&#96;0x${string}&#96; \| null`    | Decoded value returned by the contract or resolver. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.dns.getDnsRecord.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.dns.getDnsRecord.request(parameters);
```

## Error

```ts
import type { GetDnsRecordError } from "@ensforge/sdk/dns";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getDnsRecord`](/core/api/actions/dns/get-dns-record)
