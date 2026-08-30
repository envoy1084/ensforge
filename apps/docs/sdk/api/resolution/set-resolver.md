---
title: setResolver
description: Sets resolver for resolution and resolver lifecycle.
---

# setResolver

Sets resolver for resolution and resolver lifecycle.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.resolution.setResolver({
  name: "example.eth",
  resolver: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetResolverParameters } from "@ensforge/sdk/resolution";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### resolver

`string`

Resolver address used by the method.

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

const program = sdk.resolution.setResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.resolution.setResolver.call(parameters);
```

## Error

```ts
import type { SetResolverError } from "@ensforge/sdk/resolution";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setResolver`](/core/api/actions/resolution/set-resolver)
