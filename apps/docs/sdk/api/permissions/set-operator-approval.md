---
title: setOperatorApproval
description: Sets operator approval for approvals and roles.
---

# setOperatorApproval

Sets operator approval for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.permissions.setOperatorApproval({
  name: "example.eth",
  target: "0x0000000000000000000000000000000000000001",
  operator: "0x0000000000000000000000000000000000000001",
  approved: true,
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetOperatorApprovalParameters } from "@ensforge/sdk/permissions";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### target

`OperatorApprovalKind`

Target account or approval kind.

### operator

`string`

Operator whose approval is read or changed.

### approved

`boolean`

Whether the target should be approved.

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

const program = sdk.permissions.setOperatorApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.permissions.setOperatorApproval.call(parameters);
```

## Error

```ts
import type { SetOperatorApprovalError } from "@ensforge/sdk/permissions";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setOperatorApproval`](/core/api/actions/permissions/set-operator-approval)
