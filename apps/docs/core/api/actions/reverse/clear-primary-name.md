---
title: clearPrimaryName
description: Clears primary name for primary-name and reverse resolution.
---

# clearPrimaryName

Clears primary name for primary-name and reverse resolution.

## Import

```ts
import { clearPrimaryName } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { clearPrimaryName } from "@ensforge/core";
import { config } from "./config";

const result = await clearPrimaryName(config, {});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { ClearPrimaryNameParameters } from "@ensforge/core";
```

### parameters

`ClearPrimaryNameParameters`

Argument passed to `clearPrimaryName`.

### options

`Effect.RunOptions | undefined`

Argument passed to `clearPrimaryName`.

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

const program = clearPrimaryName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = clearPrimaryName.call(parameters);
```

## Error

```ts
import type { ClearPrimaryNameError } from "@ensforge/core";
```

The Promise API rejects with the same typed failures exposed by the Effect error channel. Errors have a stable `_tag`, `code`, and `message`; boundary errors retain their original `cause`.

See [Error Handling](/core/guides/error-handling).

## Related

- [`ens.reverse.clearPrimaryName`](/sdk/api/reverse/clear-primary-name)
