---
title: approveName
description: Approves name for approvals and roles.
---

# approveName

Approves name for approvals and roles.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.permissions.approveName({
  name: "example.eth",
  approved: true,
});
```

## Parameters

```ts
type ApproveNameParameters = Parameters<typeof sdk.permissions.approveName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### approved

`string`

Whether the target should be approved.

## Return Type

```ts
type ApproveNameResult = Awaited<ReturnType<typeof sdk.permissions.approveName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.permissions.approveName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.permissions.approveName.call(parameters);
```

## Action

- [`approveName`](/core/api/actions/permissions/approve-name)
