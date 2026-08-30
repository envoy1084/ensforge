---
title: setDnsRecords
description: Sets dns records for DNSSEC names and DNS resolver records.
---

# setDnsRecords

Sets dns records for DNSSEC names and DNS resolver records.

## Import

```ts
import { setDnsRecords } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setDnsRecords } from "@ensforge/core";
import { config } from "./config";

const result = await setDnsRecords(config, {
  name: "example.eth",
  data: "0x",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetDnsRecordsParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### data

`Hex`

Raw calldata or resolver bytes.

## Return Type

```ts
import type { CallExecutionResult } from "@ensforge/core";
```

| Property    | Type                                          | Description                                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `id`        | `string`                                      | Stable operation or wallet batch identifier.                                   |
| `operation` | `string`                                      | The operation value returned by the operation.                                 |
| `status`    | `"not-started" \| "submitted" \| "confirmed"` | Current query, transaction, batch, or workflow status.                         |
| `hash`      | `null \| &#96;0x${string}&#96; \| null`       | Transaction hash, or `null` before submission.                                 |
| `receipt`   | `null \| WriteReceipt \| null`                | Normalized transaction receipt, or `null` when confirmation was not requested. |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = setDnsRecords.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setDnsRecords.call(parameters);
```

## Error

```ts
import type { SetDnsRecordsError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.dns.setDnsRecords`](/sdk/api/dns/set-dns-records)
