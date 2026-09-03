---
title: hasDnsRecords
description: Checks whether dns records for DNSSEC names and DNS resolver records.
---

# hasDnsRecords

Checks whether dns records for DNSSEC names and DNS resolver records.

## Import

```ts
import { hasDnsRecords } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { hasDnsRecords } from "@ensforge/core";
import { config } from "./config";

const result = await hasDnsRecords(config, {
  name: "example.eth",
  recordName: "_ens.example.com",
});
```

<<< @/snippets/core/config.ts

:::

<ReadActionDemo action="dns.hasDnsRecords" />

## Parameters

```ts
import type { HasDnsRecordsParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### recordName

`string`

Owner name of the DNS resource record.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type HasDnsRecordsResult = Awaited<ReturnType<typeof hasDnsRecords>>;
```

| Property     | Type                               | Description                                     |
| ------------ | ---------------------------------- | ----------------------------------------------- |
| `name`       | `string & Brand<"NormalizedName">` | Normalized ENS name.                            |
| `recordName` | `string & Brand<"NormalizedName">` | The recordName value returned by the operation. |
| `resolver`   | `&#96;0x${string}&#96; \| null`    | The resolver value returned by the operation.   |
| `exists`     | `boolean`                          | The exists value returned by the operation.     |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = hasDnsRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = hasDnsRecords.request(parameters);
```

## Error

```ts
import type { HasDnsRecordsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.dns.hasDnsRecords`](/sdk/api/dns/has-dns-records)
