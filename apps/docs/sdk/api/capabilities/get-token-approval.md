---
title: getTokenApproval
description: Gets token approval for capability and authorization discovery.
---

# getTokenApproval

Gets token approval for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

::: code-group

```ts [index.ts]
import { sdk } from "./client";

const result = await sdk.capabilities.getTokenApproval({
  name: "example.eth",
});
```

<<< @/snippets/sdk/client.ts

:::

<ReadActionDemo action="capabilities.getTokenApproval" />

## Parameters

```ts
import type { NameCapabilityParameters } from "@ensforge/sdk/capabilities";
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

## Return Type

```ts
type GetTokenApprovalResult = Awaited<ReturnType<typeof getTokenApproval>>;
```

| Property    | Type                                                                    | Description                                            |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------ |
| `supported` | `false \| true`                                                         | Whether the selected protocol supports this operation. |
| `protocol`  | `"v1" \| "v2" \| "v1"`                                                  | ENS protocol route used for the result.                |
| `reason`    | `"PER_TOKEN_APPROVAL_UNSUPPORTED" \| "NAME_NOT_TOKENIZED" \| undefined` | The reason value returned by the operation.            |
| `kind`      | `"name-wrapper" \| "registrar" \| undefined`                            | The kind value returned by the operation.              |
| `contract`  | `&#96;0x${string}&#96; \| undefined`                                    | The contract value returned by the operation.          |
| `tokenId`   | `bigint \| undefined`                                                   | The tokenId value returned by the operation.           |
| `approved`  | `&#96;0x${string}&#96; \| null \| undefined`                            | The approved value returned by the operation.          |

## Effect

<!--@include: @/shared/sdk/effect.md-->

```ts
import { Effect } from "effect";
import { sdk } from "./client";

const program = sdk.capabilities.getTokenApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof program>;
type Failure = Effect.Effect.Error<typeof program>;

const result = await Effect.runPromise(program);
```

## Request

<!--@include: @/shared/sdk/request.md-->

```ts
const request = sdk.capabilities.getTokenApproval.request(parameters);
```

## Error

```ts
import type { GetTokenApprovalError } from "@ensforge/sdk/capabilities";
```

<!--@include: @/shared/sdk/error.md-->

## Action

- [`getTokenApproval`](/core/api/actions/capabilities/get-token-approval)
