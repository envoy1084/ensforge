---
title: getDnsRecord
description: Gets dns record for DNSSEC names and DNS resolver records.
---

# getDnsRecord

Gets dns record for DNSSEC names and DNS resolver records.

## Import

```ts
import { getDnsRecord } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getDnsRecord } from "@ensforge/core";
import { config } from "./config";

const result = await getDnsRecord(config, {
  name: "example.eth",
  recordName: "_ens.example.com",
  resource: 1n,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetDnsRecordParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### recordName

`string`

Owner name of the DNS resource record.

### resource

`DnsResource`

ENSv2 resource identifier or DNS resource type used by the action.

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

const program = getDnsRecord.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

Use `.request` to describe the read without executing it, then include it in a typed [read batch](/core/guides/batching).

```ts
const request = getDnsRecord.request(parameters);
```

## Error

```ts
import type { GetDnsRecordError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.dns.getDnsRecord`](/sdk/api/dns/get-dns-record)
