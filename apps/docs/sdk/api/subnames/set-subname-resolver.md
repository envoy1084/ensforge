---
title: setSubnameResolver
description: Sets subname resolver for subname management.
---

# setSubnameResolver

Sets subname resolver for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.subnames.setSubnameResolver({
  resolver: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetSubnameResolverParameters } from "@ensforge/sdk";
```

### resolver

`string`

Resolver address used by the method.

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

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

const program = sdk.subnames.setSubnameResolver.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.subnames.setSubnameResolver.call(parameters);
```

## Error

```ts
import type { SetSubnameResolverError } from "@ensforge/sdk";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setSubnameResolver`](/core/api/actions/subnames/set-subname-resolver)
