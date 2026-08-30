---
title: reclaimName
description: reclaim name for ownership management.
---

# reclaimName

reclaim name for ownership management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.ownership.reclaimName({
  name: "example.eth",
  manager: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { ReclaimNameParameters } from "@ensforge/sdk/ownership";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### manager

`string`

Address that should manage the name.

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

const program = sdk.ownership.reclaimName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.ownership.reclaimName.call(parameters);
```

## Error

```ts
import type { ReclaimNameError } from "@ensforge/sdk/ownership";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`reclaimName`](/core/api/actions/ownership/reclaim-name)
