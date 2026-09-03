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

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.dns.hasDnsRecords({
  name: "example.eth",
  recordName: "_ens.example.com",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="dns.hasDnsRecords" />

## Parameters

```ts
import type { HasDnsRecordsParameters } from "@ensforge/sdk/dns";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### recordName

`string`

DNS record owner name.

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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.dns.hasDnsRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.dns.hasDnsRecords.request(parameters);
```

## Error

```ts
import type { HasDnsRecordsError } from "@ensforge/sdk/dns";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`hasDnsRecords`](/core/api/actions/dns/has-dns-records)
