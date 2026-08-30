---
title: claimDnsName
description: claim dns name for DNS and DNSSEC.
---

# claimDnsName

claim dns name for DNS and DNSSEC.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.dns.claimDnsName({
  name: "example.eth",
  proof: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ClaimDnsNameParameters } from "@ensforge/sdk/dns";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### proof

`ReadonlyArray<DnssecProof>`

DNSSEC proof records.

### resolver

`string | undefined`

Resolver address used by the method.

### address

`string | undefined`

Address used by the method.

## Return Type

```ts
import type { CallExecutionResult } from "@ensforge/sdk";
```

| Property    | Type                                          | Description                                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `id`        | `string`                                      | Stable operation or wallet batch identifier.                                   |
| `operation` | `string`                                      | The operation value returned by the operation.                                 |
| `status`    | `"not-started" \| "submitted" \| "confirmed"` | Current query, transaction, batch, or workflow status.                         |
| `hash`      | `null \| &#96;0x${string}&#96; \| null`       | Transaction hash, or `null` before submission.                                 |
| `receipt`   | `null \| WriteReceipt \| null`                | Normalized transaction receipt, or `null` when confirmation was not requested. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.dns.claimDnsName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.dns.claimDnsName.call(parameters);
```

## Error

```ts
import type { ClaimDnsNameError } from "@ensforge/sdk/dns";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`claimDnsName`](/core/api/actions/dns/claim-dns-name)
