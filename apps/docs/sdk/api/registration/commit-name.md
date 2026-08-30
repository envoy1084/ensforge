---
title: commitName
description: commit name for registration and renewal.
---

# commitName

commit name for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.registration.commitName({
  commitment: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { CommitNameParameters } from "@ensforge/sdk/registration";
```

### commitment

`Bytes32`

Registration commitment.

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

const program = sdk.registration.commitName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.registration.commitName.call(parameters);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`commitName`](/core/api/actions/registration/commit-name)
