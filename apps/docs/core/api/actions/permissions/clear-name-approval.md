---
title: clearNameApproval
description: Clears name approval for approvals and scoped roles.
---

# clearNameApproval

Clears name approval for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { clearNameApproval } from "@ensforge/core";
```

## Usage

```ts
import { clearNameApproval } from "@ensforge/core";
import { config } from "./config";

const result = await clearNameApproval(config, {
  name: "example.eth",
});
```

## Parameters

```ts
type ClearNameApprovalParameters = Parameters<typeof clearNameApproval>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

## Return Type

```ts
type ClearNameApprovalResult = Awaited<ReturnType<typeof clearNameApproval>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = clearNameApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = clearNameApproval.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ClearNameApprovalError = Effect.Effect.Error<ReturnType<typeof clearNameApproval.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
