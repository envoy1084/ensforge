---
title: getDnsClaimStatus
description: Gets dns claim status for DNSSEC names and DNS resolver records.
---

# getDnsClaimStatus

Gets dns claim status for DNSSEC names and DNS resolver records.

## Import

```ts
import { getDnsClaimStatus } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getDnsClaimStatus } from "@ensforge/core";
import { config } from "./config";

const result = await getDnsClaimStatus(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetDnsClaimStatusParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetDnsClaimStatusResult = Awaited<ReturnType<typeof getDnsClaimStatus>>;
```

| Property            | Type                                             | Description                                                  |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `status`            | `"unsupported" \| "claimed" \| "proof-required"` | Current query, transaction, batch, or workflow status.       |
| `name`              | `string & Brand<"NormalizedName">`               | Normalized ENS name.                                         |
| `reason`            | `"DNS_REGISTRAR_UNAVAILABLE" \| undefined`       | The reason value returned by the operation.                  |
| `owner`             | `&#96;0x${string}&#96; \| undefined`             | Current owner address, or `null` when the name has no owner. |
| `resolver`          | `&#96;0x${string}&#96; \| null \| undefined`     | The resolver value returned by the operation.                |
| `previousInception` | `bigint \| undefined`                            | The previousInception value returned by the operation.       |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getDnsClaimStatus.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getDnsClaimStatus.request(parameters);
```

## Error

```ts
import type { GetDnsClaimStatusError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.dns.getDnsClaimStatus`](/sdk/api/dns/get-dns-claim-status)
