---
title: getDnsClaimStatus
description: Gets dns claim status for DNS and DNSSEC.
---

# getDnsClaimStatus

Gets dns claim status for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.dns.getDnsClaimStatus({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { GetDnsClaimStatusParameters } from "@ensforge/sdk/dns";
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

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.dns.getDnsClaimStatus.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.dns.getDnsClaimStatus.request(parameters);
```

## Error

```ts
import type { GetDnsClaimStatusError } from "@ensforge/sdk/dns";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getDnsClaimStatus`](/core/api/actions/dns/get-dns-claim-status)
