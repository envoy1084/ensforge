---
title: setFuses
description: Sets fuses for wrapped names.
---

# setFuses

Sets fuses for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.wrapping.setFuses({
  name: "example.eth",
  fuses: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetFusesParameters } from "@ensforge/sdk/wrapping";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this method.

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

const program = sdk.wrapping.setFuses.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.wrapping.setFuses.call(parameters);
```

## Error

```ts
import type { SetFusesError } from "@ensforge/sdk/wrapping";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setFuses`](/core/api/actions/wrapping/set-fuses)
