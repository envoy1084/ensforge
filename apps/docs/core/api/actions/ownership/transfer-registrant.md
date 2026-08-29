---
title: transferRegistrant
description: Transfers registrant through the active ENS ownership route.
---

# transferRegistrant

Transfers registrant through the active ENS ownership route.

## Import

```ts
import { transferRegistrant } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { transferRegistrant } from "@ensforge/core";
import { config } from "./config";

const result = await transferRegistrant(config, {
  name: "example.eth",
  to: "value",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { TransferRegistrantParameters } from "@ensforge/core";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### to

`string`

Value used for `to` by this action.

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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";

const program = transferRegistrant.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = transferRegistrant.call(parameters);
```

## Error

```ts
import type { TransferRegistrantError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.ownership.transferRegistrant`](/sdk/api/ownership/transfer-registrant)
