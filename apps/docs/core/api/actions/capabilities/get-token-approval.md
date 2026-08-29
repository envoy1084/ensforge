---
title: getTokenApproval
description: Gets token approval for ENS permissions and contract capabilities.
---

# getTokenApproval

Gets token approval for ENS permissions and contract capabilities.

This action belongs to ENS permissions and contract capabilities. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { getTokenApproval } from "@ensforge/core";
```

## Usage

```ts
import { getTokenApproval } from "@ensforge/core";
import { config } from "./config";

const result = await getTokenApproval(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type GetTokenApprovalParameters = Parameters<typeof getTokenApproval>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTokenApprovalResult = Awaited<ReturnType<typeof getTokenApproval>>;
```

The return type is inferred from the action and preserves its discriminated protocol and workflow states.

## Effect

```ts
const effect = getTokenApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

Use `.request` to include the read in [`readBatch`](/core/guides/batching).

```ts
const request = getTokenApproval.request(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type GetTokenApprovalError = Effect.Effect.Error<ReturnType<typeof getTokenApproval.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
