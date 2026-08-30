---
title: setChildFuses
description: Sets child fuses for wrapped names, expiries, and fuses.
---

# setChildFuses

Sets child fuses for wrapped names, expiries, and fuses.

## Import

```ts
import { setChildFuses } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setChildFuses } from "@ensforge/core";
import { config } from "./config";

const result = await setChildFuses(config, {
  expiry: 2_000_000_000n,
  name: "example.eth",
  fuses: [],
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetChildFusesParameters } from "@ensforge/core";
```

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this action.

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

const program = setChildFuses.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setChildFuses.call(parameters);
```

## Error

```ts
import type { SetChildFusesError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.wrapping.setChildFuses`](/sdk/api/wrapping/set-child-fuses)
