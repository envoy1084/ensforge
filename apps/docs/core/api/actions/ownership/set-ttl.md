---
title: setTtl
description: Sets ttl for name ownership and registry management.
---

# setTtl

Sets ttl for name ownership and registry management.

## Import

```ts
import { setTtl } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setTtl } from "@ensforge/core";
import { config } from "./config";

const result = await setTtl(config, {
  name: "example.eth",
  ttl: 300n,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetTtlParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### ttl

`bigint`

Registry time-to-live in seconds.

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

const program = setTtl.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setTtl.call(parameters);
```

## Error

```ts
import type { SetTtlError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.ownership.setTtl`](/sdk/api/ownership/set-ttl)
