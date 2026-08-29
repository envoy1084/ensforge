---
title: approveName
description: Approves name for approvals and scoped roles.
---

# approveName

Approves name for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { approveName } from "@ensforge/core";
```

## Usage

```ts
import { approveName } from "@ensforge/core";
import { config } from "./config";

const result = await approveName(config, {
  name: "example.eth",
  approved: true,
});
```

## Parameters

```ts
type ApproveNameParameters = Parameters<typeof approveName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### approved

`string`

Whether the target should be approved.

## Return Type

```ts
type ApproveNameResult = Awaited<ReturnType<typeof approveName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = approveName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = approveName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type ApproveNameError = Effect.Effect.Error<ReturnType<typeof approveName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
