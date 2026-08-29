---
title: setResolverDelegateApproval
description: Sets resolver delegate approval for approvals and scoped roles.
---

# setResolverDelegateApproval

Sets resolver delegate approval for approvals and scoped roles.

This action belongs to approvals and scoped roles. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setResolverDelegateApproval } from "@ensforge/core";
```

## Usage

```ts
import { setResolverDelegateApproval } from "@ensforge/core";
import { config } from "./config";

const result = await setResolverDelegateApproval(config, {
  name: "example.eth",
  delegate: "0x0000000000000000000000000000000000000001",
  approved: true,
});
```

## Parameters

```ts
type SetResolverDelegateApprovalParameters = Parameters<typeof setResolverDelegateApproval>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### delegate

`string`

Delegate address whose resolver permissions are read or changed.

### approved

`boolean`

Whether the target should be approved.

## Return Type

```ts
type SetResolverDelegateApprovalResult = Awaited<ReturnType<typeof setResolverDelegateApproval>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setResolverDelegateApproval.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setResolverDelegateApproval.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetResolverDelegateApprovalError = Effect.Effect.Error<
  ReturnType<typeof setResolverDelegateApproval.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
