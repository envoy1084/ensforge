---
title: setPrimaryNameForAddress
description: Sets primary name for address for reverse resolution.
---

# setPrimaryNameForAddress

Sets primary name for address for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.reverse.setPrimaryNameForAddress({
  address: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetPrimaryNameForAddressParameters } from "@ensforge/sdk/reverse";
```

### address

`string`

Address used by the method.

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

const program = sdk.reverse.setPrimaryNameForAddress.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.reverse.setPrimaryNameForAddress.call(parameters);
```

## Error

```ts
import type { SetPrimaryNameForAddressError } from "@ensforge/sdk/reverse";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setPrimaryNameForAddress`](/core/api/actions/reverse/set-primary-name-for-address)
