---
title: getOperatorApproval
description: Gets operator approval for capability and authorization discovery.
---

# getOperatorApproval

Gets operator approval for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.getOperatorApproval({
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  operator: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="capabilities.getOperatorApproval" />

## Parameters

```ts
import type { GetOperatorApprovalParameters } from "@ensforge/sdk/capabilities";
```

### name

`string`

ENS name to operate on. ensforge normalizes it before hashing or contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Named block state to read from. Cannot be combined with `blockNumber`.

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### operator

`EthereumAddress`

Operator whose approval is read or changed.

## Return Type

```ts
type GetOperatorApprovalResult = Awaited<ReturnType<typeof getOperatorApproval>>;
```

| Property   | Type                                                                                                                                                                                    | Description                                                  |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `owner`    | `&#96;0x${string}&#96;`                                                                                                                                                                 | Current owner address, or `null` when the name has no owner. |
| `operator` | `&#96;0x${string}&#96;`                                                                                                                                                                 | The operator value returned by the operation.                |
| `targets`  | `readonly { readonly kind: "registry" \| "resolver" \| "registrar" \| "wrapper"; readonly address: &#96;0x${string}&#96;; readonly supported: boolean; readonly approved: boolean; }[]` | The targets value returned by the operation.                 |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.getOperatorApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.capabilities.getOperatorApproval.request(parameters);
```

## Error

```ts
import type { GetOperatorApprovalError } from "@ensforge/sdk/capabilities";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getOperatorApproval`](/core/api/actions/capabilities/get-operator-approval)
