---
title: getOperatorApproval
description: Gets operator approval for ENS permissions and contract capabilities.
---

# getOperatorApproval

Gets operator approval for ENS permissions and contract capabilities.

## Import

```ts
import { getOperatorApproval } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getOperatorApproval } from "@ensforge/core";
import { config } from "./config";

const result = await getOperatorApproval(config, {
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  operator: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetOperatorApprovalParameters } from "@ensforge/core";
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

Operator address whose approval is read or changed.

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

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getOperatorApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getOperatorApproval.request(parameters);
```

## Error

```ts
import type { GetOperatorApprovalError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.capabilities.getOperatorApproval`](/sdk/api/capabilities/get-operator-approval)
