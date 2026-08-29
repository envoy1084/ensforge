---
title: setOperatorApproval
description: Sets operator approval for approvals and roles.
---

# setOperatorApproval

Sets operator approval for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.setOperatorApproval({
  name: "example.eth",
  target: "0x0000000000000000000000000000000000000001",
  operator: "0x0000000000000000000000000000000000000001",
  approved: true,
});
```

## Parameters

```ts
type SetOperatorApprovalParameters = Parameters<typeof sdk.permissions.setOperatorApproval>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### target

`OperatorApprovalKind`

Target account or approval kind.

### operator

`string`

Operator whose approval is read or changed.

### approved

`boolean`

Whether the target should be approved.

## Return Type

```ts
type SetOperatorApprovalResult = Awaited<ReturnType<typeof sdk.permissions.setOperatorApproval>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.setOperatorApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.permissions.setOperatorApproval.call(parameters);
```

## Action

- [`setOperatorApproval`](/core/api/actions/permissions/set-operator-approval)
