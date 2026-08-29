---
title: setResolverDelegateApproval
description: Sets resolver delegate approval for approvals and roles.
---

# setResolverDelegateApproval

Sets resolver delegate approval for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.setResolverDelegateApproval({
  name: "example.eth",
  delegate: "0x0000000000000000000000000000000000000001",
  approved: true,
});
```

## Parameters

```ts
type SetResolverDelegateApprovalParameters = Parameters<
  typeof sdk.permissions.setResolverDelegateApproval
>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### delegate

`string`

Resolver delegate whose approval or roles are read or changed.

### approved

`boolean`

Whether the target should be approved.

## Return Type

```ts
type SetResolverDelegateApprovalResult = Awaited<
  ReturnType<typeof sdk.permissions.setResolverDelegateApproval>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.setResolverDelegateApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.permissions.setResolverDelegateApproval.call(parameters);
```

## Action

- [`setResolverDelegateApproval`](/core/api/actions/permissions/set-resolver-delegate-approval)
