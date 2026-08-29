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
import { ens } from "./client";

const result = await ens.dns.getDnsRecord({
  name: "example.eth",
  recordName: "_ens.example.com",
  resource: 1n,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetDnsRecordParameters } from "@ensforge/sdk";
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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.dns.getDnsRecord.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = ens.dns.getDnsRecord.request(parameters);
```

## Error

```ts
import type { GetDnsRecordError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`getDnsRecord`](/core/api/actions/dns/get-dns-record)
