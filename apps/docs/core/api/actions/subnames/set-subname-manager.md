---
title: setSubnameManager
description: Sets subname manager for subname management.
---

# setSubnameManager

Sets subname manager for subname management.

## Import

```ts
import { setSubnameManager } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setSubnameManager } from "@ensforge/core";
import { config } from "./config";

const result = await setSubnameManager(config, {
  manager: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetSubnameManagerParameters } from "@ensforge/core";
```

### manager

`string`

Address that should manage the name.

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

const program = setSubnameManager.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setSubnameManager.call(parameters);
```

## Error

```ts
import type { SetSubnameManagerError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.subnames.setSubnameManager`](/sdk/api/subnames/set-subname-manager)
