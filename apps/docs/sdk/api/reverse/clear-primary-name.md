---
title: clearPrimaryName
description: Clears primary name for reverse resolution.
---

# clearPrimaryName

Clears primary name for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.reverse.clearPrimaryName({});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ClearPrimaryNameParameters } from "@ensforge/sdk/reverse";
```

### parameters

`ClearPrimaryNameParameters`

Argument passed to `clearPrimaryName`.

### options

`Effect.RunOptions | undefined`

Argument passed to `clearPrimaryName`.

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

const program = sdk.reverse.clearPrimaryName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.reverse.clearPrimaryName.call(parameters);
```

## Error

```ts
import type { ClearPrimaryNameError } from "@ensforge/sdk/reverse";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`clearPrimaryName`](/core/api/actions/reverse/clear-primary-name)
