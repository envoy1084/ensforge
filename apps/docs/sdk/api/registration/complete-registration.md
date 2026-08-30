---
title: completeRegistration
description: complete registration for registration and renewal.
---

# completeRegistration

complete registration for registration and renewal.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.registration.completeRegistration({
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  duration: 365n * 24n * 60n * 60n,
  secret: "0x0000000000000000000000000000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

## Parameters

```ts
import type { CompleteRegistrationParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### records

`ReadonlyArray<Hex> | undefined`

Records selected, read, or written.

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### resolver

`EthereumAddress | undefined`

Resolver address used by the method.

### duration

`bigint`

Duration in seconds.

### subregistry

`EthereumAddress | undefined`

Value used for `subregistry` by this method.

### secret

`Bytes32`

32-byte registration secret.

### reverseRecord

`0 | 1 | 2 | undefined`

Value used for `reverseRecord` by this method.

### referrer

`Bytes32 | undefined`

Value used for `referrer` by this method.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

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

const program = sdk.registration.completeRegistration.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Call

<!--@include: @/shared/sdk/call.md-->

```ts
const call = sdk.registration.completeRegistration.call(parameters);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`completeRegistration`](/core/api/actions/registration/complete-registration)
