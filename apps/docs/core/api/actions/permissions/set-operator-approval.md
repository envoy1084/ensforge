---
title: setOperatorApproval
description: Sets operator approval for approvals and scoped roles.
---

# setOperatorApproval

Sets operator approval for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setOperatorApproval } from "@ensforge/core";
```

## Usage

```ts
import { setOperatorApproval } from "@ensforge/core";
import { config } from "./config";

const result = await setOperatorApproval(config, {
  name: "example.eth",
  target: "0x0000000000000000000000000000000000000001",
  operator: "0x0000000000000000000000000000000000000001",
  approved: true,
});
```

## Parameters

```ts
type SetOperatorApprovalParameters = Parameters<typeof setOperatorApproval>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### target

`OperatorApprovalKind`

Target selected by the operation.

### operator

`string`

Operator address whose approval is read or changed.

### approved

`boolean`

Whether the target should be approved.

## Return Type

```ts
type SetOperatorApprovalResult = Awaited<ReturnType<typeof setOperatorApproval>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setOperatorApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setOperatorApproval.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetOperatorApprovalError = Effect.Effect.Error<ReturnType<typeof setOperatorApproval.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
