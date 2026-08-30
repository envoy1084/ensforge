---
title: setResolverDelegateApproval
description: Sets resolver delegate approval for approvals and scoped roles.
---

# setResolverDelegateApproval

Sets resolver delegate approval for approvals and scoped roles.

## Import

```ts
import { setResolverDelegateApproval } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setResolverDelegateApproval } from "@ensforge/core";
import { config } from "./config";

const result = await setResolverDelegateApproval(config, {
  name: "example.eth",
  delegate: "0x0000000000000000000000000000000000000001",
  approved: true,
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetResolverDelegateApprovalParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### delegate

`string`

Delegate address whose resolver permissions are read or changed.

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

const program = setResolverDelegateApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setResolverDelegateApproval.call(parameters);
```

## Error

```ts
import type { SetResolverDelegateApprovalError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.permissions.setResolverDelegateApproval`](/sdk/api/permissions/set-resolver-delegate-approval)
