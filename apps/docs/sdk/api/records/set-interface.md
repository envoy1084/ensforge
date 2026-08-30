---
title: setInterface
description: Sets interface for resolver records.
---

# setInterface

Sets interface for resolver records.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.records.setInterface({
  name: "example.eth",
  interfaceId: "0x01ffc9a7",
  implementer: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetInterfaceParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### interfaceId

`string`

Four-byte ERC-165 interface identifier.

### implementer

`string`

Interface implementer address.

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

const program = sdk.records.setInterface.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.records.setInterface.call(parameters);
```

## Error

```ts
import type { SetInterfaceError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setInterface`](/core/api/actions/records/set-interface)
