---
title: setSubnameExpiry
description: Sets subname expiry for subname management.
---

# setSubnameExpiry

Sets subname expiry for subname management.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.subnames.setSubnameExpiry({
  expiry: 2_000_000_000n,
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { SetSubnameExpiryParameters } from "@ensforge/sdk/subnames";
```

### expiry

`bigint`

Unix timestamp for the requested expiry.

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

const program = sdk.subnames.setSubnameExpiry.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.subnames.setSubnameExpiry.call(parameters);
```

## Error

```ts
import type { SetSubnameExpiryError } from "@ensforge/sdk/subnames";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`setSubnameExpiry`](/core/api/actions/subnames/set-subname-expiry)
