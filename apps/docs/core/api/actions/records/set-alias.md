---
title: setAlias
description: Sets alias for ENS resolver records.
---

# setAlias

Sets alias for ENS resolver records.

## Import

```ts
import { setAlias } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setAlias } from "@ensforge/core";
import { config } from "./config";

const result = await setAlias(config, {
  name: "example.eth",
  target: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetAliasParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### target

`string | null`

Target selected by the operation.

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

const program = setAlias.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setAlias.call(parameters);
```

## Error

```ts
import type { SetAliasError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.setAlias`](/sdk/api/records/set-alias)
