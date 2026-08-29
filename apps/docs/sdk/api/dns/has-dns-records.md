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
import { ens } from "./client";

const result = await ens.dns.hasDnsRecords({
  name: "example.eth",
  recordName: "_ens.example.com",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { HasDnsRecordsParameters } from "@ensforge/sdk";
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.dns.hasDnsRecords.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.dns.hasDnsRecords.request(parameters);
```

## Error

```ts
import type { HasDnsRecordsError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`hasDnsRecords`](/core/api/actions/dns/has-dns-records)
