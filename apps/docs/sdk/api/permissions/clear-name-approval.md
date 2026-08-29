---
title: clearNameApproval
description: Clears name approval for approvals and roles.
---

# clearNameApproval

Clears name approval for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.clearNameApproval({
  name: "example.eth",
});
```

## Parameters

```ts
type ClearNameApprovalParameters = Parameters<typeof sdk.permissions.clearNameApproval>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

## Return Type

```ts
type ClearNameApprovalResult = Awaited<ReturnType<typeof sdk.permissions.clearNameApproval>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.clearNameApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.permissions.clearNameApproval.call(parameters);
```

## Action

- [`clearNameApproval`](/core/api/actions/permissions/clear-name-approval)
