---
title: getDnsImportPlan
description: Gets dns import plan for DNS and DNSSEC.
---

# getDnsImportPlan

Gets dns import plan for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.dns.getDnsImportPlan({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="dns.getDnsImportPlan" />

## Parameters

```ts
import type { GetDnsImportPlanParameters } from "@ensforge/sdk/dns";
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
type GetDnsImportPlanResult = Awaited<ReturnType<typeof getDnsImportPlan>>;
```

| Property       | Type                                                                                                                   | Description                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `status`       | `"unsupported" \| "already-claimed" \| "proof-required"`                                                               | Current query, transaction, batch, or workflow status.       |
| `name`         | `string & Brand<"NormalizedName">`                                                                                     | Normalized ENS name.                                         |
| `reason`       | `"DNS_REGISTRAR_UNAVAILABLE" \| undefined`                                                                             | The reason value returned by the operation.                  |
| `registrar`    | `&#96;0x${string}&#96; \| undefined`                                                                                   | The registrar value returned by the operation.               |
| `oracle`       | `&#96;0x${string}&#96; \| undefined`                                                                                   | The oracle value returned by the operation.                  |
| `owner`        | `&#96;0x${string}&#96; \| undefined`                                                                                   | Current owner address, or `null` when the name has no owner. |
| `resolver`     | `&#96;0x${string}&#96; \| null \| undefined`                                                                           | The resolver value returned by the operation.                |
| `proofRequest` | `{ readonly name: &#96;0x${string}&#96; & Brand<"DnsEncodedName">; readonly previousInception: bigint; } \| undefined` | The proofRequest value returned by the operation.            |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.dns.getDnsImportPlan.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.dns.getDnsImportPlan.request(parameters);
```

## Error

```ts
import type { GetDnsImportPlanError } from "@ensforge/sdk/dns";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getDnsImportPlan`](/core/api/actions/dns/get-dns-import-plan)
