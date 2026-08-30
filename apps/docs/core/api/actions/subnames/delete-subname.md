---
title: deleteSubname
description: Deletes subname from subname management.
---

# deleteSubname

Deletes subname from subname management.

## Import

```ts
import { deleteSubname } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { deleteSubname } from "@ensforge/core";
import { config } from "./config";

const result = await deleteSubname(config, {
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
type Parameters = Parameters<typeof deleteSubname>[1];
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

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

const program = deleteSubname.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = deleteSubname.call(parameters);
```

## Error

```ts
import type { DeleteSubnameError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.subnames.deleteSubname`](/sdk/api/subnames/delete-subname)
