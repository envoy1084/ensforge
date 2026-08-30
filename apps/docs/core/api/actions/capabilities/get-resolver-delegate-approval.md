---
title: getResolverDelegateApproval
description: Gets resolver delegate approval for ENS permissions and contract capabilities.
---

# getResolverDelegateApproval

Gets resolver delegate approval for ENS permissions and contract capabilities.

## Import

```ts
import { getResolverDelegateApproval } from "@ensforge/core";
```

## Usage

::: code-group

```ts [index.ts]
import { getResolverDelegateApproval } from "@ensforge/core";
import { config } from "./config";

const result = await getResolverDelegateApproval(config, {
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  delegate: "0x0000000000000000000000000000000000000001",
});
```

<<< @/snippets/core/config.ts

:::

## Parameters

```ts
import type { GetResolverDelegateApprovalParameters } from "@ensforge/core";
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

### delegate

`EthereumAddress`

Delegate address whose resolver permissions are read or changed.

## Return Type

```ts
type GetResolverDelegateApprovalResult = Awaited<ReturnType<typeof getResolverDelegateApproval>>;
```

| Property    | Type                                                                   | Description                                                  |
| ----------- | ---------------------------------------------------------------------- | ------------------------------------------------------------ |
| `supported` | `false \| true`                                                        | Whether the selected protocol supports this operation.       |
| `protocol`  | `"v1" \| "v2"`                                                         | ENS protocol route used for the result.                      |
| `reason`    | `"RESOLVER_NOT_FOUND" \| "DELEGATE_APPROVAL_UNSUPPORTED" \| undefined` | The reason value returned by the operation.                  |
| `resolver`  | `&#96;0x${string}&#96; \| undefined`                                   | The resolver value returned by the operation.                |
| `owner`     | `&#96;0x${string}&#96; \| undefined`                                   | Current owner address, or `null` when the name has no owner. |
| `delegate`  | `&#96;0x${string}&#96; \| undefined`                                   | The delegate value returned by the operation.                |
| `approved`  | `boolean \| undefined`                                                 | The approved value returned by the operation.                |

## Effect

<!--@include: @/shared/core/effect.md-->

```ts
import { Effect } from "effect";

const program = getResolverDelegateApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/core/request.md-->

```ts
const request = getResolverDelegateApproval.request(parameters);
```

## Error

```ts
import type { GetResolverDelegateApprovalError } from "@ensforge/core";
```

<!--@include: @/shared/core/error.md-->

## Related

- [`sdk.capabilities.getResolverDelegateApproval`](/sdk/api/capabilities/get-resolver-delegate-approval)
