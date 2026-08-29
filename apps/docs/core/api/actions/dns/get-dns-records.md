---
title: getDnsRecords
description: Gets dns records for DNSSEC names and DNS resolver records.
---

# getDnsRecords

Gets dns records for DNSSEC names and DNS resolver records.

## Import

```ts
import { getDnsRecords } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getDnsRecords } from "@ensforge/core";
import { config } from "./config";

const result = await getDnsRecords(config, {
  name: "example.eth",
  records: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetDnsRecordsParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### records

`ReadonlyArray<DnsRecordQuery>`

Records selected, read, or written by the operation.

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

const program = getDnsRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getDnsRecords.request(parameters);
```

## Error

```ts
import type { GetDnsRecordsError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.dns.getDnsRecords`](/sdk/api/dns/get-dns-records)
