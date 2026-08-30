---
title: commitName
description: commit name for registration and renewal.
---

# commitName

commit name for registration and renewal.

## Import

```ts
import { commitName } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { commitName } from "@ensforge/core";
import { config } from "./config";

const result = await commitName(config, {
  commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { CommitNameParameters } from "@ensforge/core";
```

### commitment

`Bytes32`

Registration commitment to submit or inspect.

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

const program = commitName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = commitName.call(parameters);
```

## Error

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.registration.commitName`](/sdk/api/registration/commit-name)
