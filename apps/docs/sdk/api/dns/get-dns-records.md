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
import { ens } from "./client";

const result = await ens.dns.getDnsRecords({
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.dns.getDnsRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.dns.getDnsRecords.request(parameters);
```

## Error

```ts
import type { GetDnsRecordsError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getDnsRecords`](/core/api/actions/dns/get-dns-records)
