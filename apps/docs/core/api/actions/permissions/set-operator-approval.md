---
title: setOperatorApproval
description: Sets operator approval for approvals and scoped roles.
---

# setOperatorApproval

Sets operator approval for approvals and scoped roles.

## Import

```ts
import { setOperatorApproval } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setOperatorApproval } from "@ensforge/core";
import { config } from "./config";

const result = await setOperatorApproval(config, {
  name: "example.eth",
  target: "0x0000000000000000000000000000000000000001",
  operator: "0x0000000000000000000000000000000000000001",
  approved: true,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetOperatorApprovalParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### target

`OperatorApprovalKind`

Target selected by the operation.

### operator

`string`

Operator address whose approval is read or changed.

### approved

`boolean`

Whether the target should be approved.

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

const program = setOperatorApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setOperatorApproval.call(parameters);
```

## Error

```ts
import type { SetOperatorApprovalError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.permissions.setOperatorApproval`](/sdk/api/permissions/set-operator-approval)
