---
title: setAbi
description: Sets abi for resolver records.
---

# setAbi

Sets abi for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.setAbi({
  name: "example.eth",
  contentType: {},
  value: "https://example.com",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetAbiParameters } from "@ensforge/sdk/records";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### contentType

`Exclude<AbiContentType, "uri">`

Value used for `contentType` by this method.

### value

`Abi`

Value written by the method.

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

const program = sdk.records.setAbi.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.records.setAbi.call(parameters);
```

## Error

```ts
import type { SetAbiError } from "@ensforge/sdk/records";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setAbi`](/core/api/actions/records/set-abi)
