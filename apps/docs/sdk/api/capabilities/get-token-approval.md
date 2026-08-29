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

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getTokenApproval({
  name: "example.eth",
});
```

## Parameters

```ts
type GetTokenApprovalParameters = Parameters<typeof sdk.capabilities.getTokenApproval>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### blockNumber

`bigint | undefined`

Block number to read from. Cannot be combined with `blockTag`.

### blockTag

`"latest" | "earliest" | "pending" | "safe" | "finalized" | undefined`

Block tag to read from. Cannot be combined with `blockNumber`.

## Return Type

```ts
type GetTokenApprovalResult = Awaited<ReturnType<typeof sdk.capabilities.getTokenApproval>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getTokenApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getTokenApproval.request(parameters);
```

## Action

- [`getTokenApproval`](/core/api/actions/capabilities/get-token-approval)
