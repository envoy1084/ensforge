---
title: setPrimaryNameForAddress
description: Sets primary name for address for primary-name and reverse resolution.
---

# setPrimaryNameForAddress

Sets primary name for address for primary-name and reverse resolution.

## Import

```ts
import { setPrimaryNameForAddress } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setPrimaryNameForAddress } from "@ensforge/core";
import { config } from "./config";

const result = await setPrimaryNameForAddress(config, {
  address: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetPrimaryNameForAddressParameters } from "@ensforge/core";
```

### address

`string`

Address used by this operation.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### verifyForward

`boolean | undefined`

Whether a reverse result must resolve forward to the supplied address.

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

const program = setPrimaryNameForAddress.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setPrimaryNameForAddress.call(parameters);
```

## Error

```ts
import type { SetPrimaryNameForAddressError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.reverse.setPrimaryNameForAddress`](/sdk/api/reverse/set-primary-name-for-address)
