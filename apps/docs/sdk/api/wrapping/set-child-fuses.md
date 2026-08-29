---
title: setChildFuses
description: Sets child fuses for wrapped names.
---

# setChildFuses

Sets child fuses for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { ens } from "./client";

const result = await ens.wrapping.setChildFuses({
  expiry: 2_000_000_000n,
  name: "example.eth",
  fuses: [],
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetChildFusesParameters } from "@ensforge/sdk";
```

### expiry

`bigint`

Unix timestamp for the requested expiry.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### fuses

`number | ReadonlyArray<NameWrapperFuseName>`

Value used for `fuses` by this method.

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

Use `.effect` when composing the method in an Effect program. The success and error channels remain fully typed.

```ts
import { Effect } from "effect";
import { ens } from "./client";

const program = ens.wrapping.setChildFuses.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

Use `.call` to prepare this write for simulation, wallet batching, or a custom execution policy.

```ts
const call = ens.wrapping.setChildFuses.call(parameters);
```

## Error

```ts
import type { SetChildFusesError } from "@ensforge/sdk";
```

The method rejects with the corresponding Core action errors. Use `.effect` to keep those failures in the typed Effect error channel.

See [Error Handling](/sdk/guides/error-handling).

## Action

- [`setChildFuses`](/core/api/actions/wrapping/set-child-fuses)
