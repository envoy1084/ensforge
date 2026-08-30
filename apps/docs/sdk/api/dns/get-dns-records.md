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

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.dns.getDnsRecords({
  name: "example.eth",
  records: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetDnsRecordsParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### records

`ReadonlyArray<DnsRecordQuery>`

Records selected, read, or written.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsRecordsResult = Awaited<ReturnType<typeof getDnsRecords>>;
```

| Property   | Type                                                                                                                                                                                                                                                 | Description                                   |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `name`     | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                   | Normalized ENS name.                          |
| `resolver` | `&#96;0x${string}&#96; \| null`                                                                                                                                                                                                                      | The resolver value returned by the operation. |
| `records`  | `readonly { readonly name: string & Brand<"NormalizedName">; readonly recordName: string & Brand<"NormalizedName">; readonly resource: number; readonly resolver: &#96;0x${string}&#96; \| null; readonly value: &#96;0x${string}&#96; \| null; }[]` | The records value returned by the operation.  |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.dns.getDnsRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.dns.getDnsRecords.request(parameters);
```

## Error

```ts
import type { GetDnsRecordsError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getDnsRecords`](/core/api/actions/dns/get-dns-records)
