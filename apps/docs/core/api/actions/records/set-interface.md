---
title: setInterface
description: Sets interface for ENS resolver records.
---

# setInterface

Sets interface for ENS resolver records.

## Import

```ts
import { setInterface } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { setInterface } from "@ensforge/core";
import { config } from "./config";

const result = await setInterface(config, {
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
  implementer: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { SetInterfaceParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### implementer

`string`

Contract address that implements the interface.

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

const program = setInterface.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/core/call.md-->

```ts
const call = setInterface.call(parameters);
```

## Error

```ts
import type { SetInterfaceError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.records.setInterface`](/sdk/api/records/set-interface)
