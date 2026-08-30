---
title: registerName
description: Runs the resumable registration workflow for one name.
---

# registerName

Runs the resumable registration workflow for one name.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.registration.registerName({
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
import type { RegisterNameParameters } from "@ensforge/sdk";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

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

### walletClient

`WalletClient | undefined`

Viem wallet client override for this operation. Defaults to the wallet resolved from the config.

### account

`Account | Address | undefined`

Account used to authorize this operation. Defaults to the account exposed by the resolved wallet client.

### mode

`WriteMode | undefined`

Write execution strategy. `auto` uses wallet capabilities and falls back to sequential transactions.

### confirmation

`ConfirmationPolicy | undefined`

Controls whether the action returns after submission or waits for one or more confirmations.

### paymentToken

`EthereumAddress | undefined`

Payment token used by a supported registrar.

### maxPrice

`bigint | undefined`

Maximum price accepted by the caller.

### records

`ReadonlyArray<SetRecordInput> | undefined`

Records selected, read, or written.

### resume

`RegisterNameResult | undefined`

Previously returned progress used to continue the workflow.

## Return Type

```ts
import type { RegisterNameResult } from "@ensforge/sdk";
```

| Property                  | Type                                                                                                                                                                                                                                                                                                          | Description                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `status`                  | `"completed" \| "waiting" \| "partial" \| "submitted"`                                                                                                                                                                                                                                                        | Current query, transaction, batch, or workflow status.           |
| `name`                    | `string & Brand<"NormalizedName">`                                                                                                                                                                                                                                                                            | Normalized ENS name.                                             |
| `protocol`                | `"v1" \| "v2"`                                                                                                                                                                                                                                                                                                | ENS protocol route used for the result.                          |
| `commitment`              | `&#96;0x${string}&#96;`                                                                                                                                                                                                                                                                                       | The commitment value returned by the operation.                  |
| `committedByWorkflow`     | `boolean`                                                                                                                                                                                                                                                                                                     | The committedByWorkflow value returned by the operation.         |
| `paymentApprovalIncluded` | `boolean`                                                                                                                                                                                                                                                                                                     | The paymentApprovalIncluded value returned by the operation.     |
| `readyAt`                 | `bigint \| null`                                                                                                                                                                                                                                                                                              | The readyAt value returned by the operation.                     |
| `expiresAt`               | `bigint \| null`                                                                                                                                                                                                                                                                                              | The expiresAt value returned by the operation.                   |
| `nextActionAt`            | `bigint \| null`                                                                                                                                                                                                                                                                                              | The nextActionAt value returned by the operation.                |
| `price`                   | `{ readonly status: "available"; readonly name: string & Brand<"NormalizedName">; readonly protocol: "v1" \| "v2"; readonly registrar: &#96;0x${string}&#96;; readonly duration: bigint; readonly base: bigint; readonly premium: bigint; readonly total: bigint; readonly currency: { ...; } \| { ...; }; }` | The price value returned by the operation.                       |
| `write`                   | `WritePlanProgress`                                                                                                                                                                                                                                                                                           | Progress for the write plan used by the workflow.                |
| `finalState`              | `{ readonly kind: "available"; readonly protocol: "v1" \| "v2"; readonly wrapped: false; readonly migrated: false; readonly name: string & Brand<"NormalizedName">; readonly status: "available" \| ... 3 more ... \| "expired"; ... 10 more ...; readonly renewable: boolean; } \| ... 5 more ... \| null`   | Name state observed after the workflow finishes, when available. |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.registration.registerName.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Error

<!--@include: @/shared/sdk/error.md-->

## Action

- [`registerName`](/core/api/actions/registration/register-name)
