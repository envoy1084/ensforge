---
title: setContractPrimaryName
description: Sets contract primary name for reverse resolution.
---

# setContractPrimaryName

Sets contract primary name for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.reverse.setContractPrimaryName({
  contract: "value",
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetContractPrimaryNameParameters } from "@ensforge/sdk/reverse";
```

### contract

`string`

Value used for `contract` by this method.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### verifyForward

`boolean | undefined`

Value used for `verifyForward` by this method.

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

const program = sdk.reverse.setContractPrimaryName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.reverse.setContractPrimaryName.call(parameters);
```

## Error

```ts
import type { SetContractPrimaryNameError } from "@ensforge/sdk/reverse";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setContractPrimaryName`](/core/api/actions/reverse/set-contract-primary-name)
