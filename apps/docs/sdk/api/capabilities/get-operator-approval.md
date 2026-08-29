---
title: getOperatorApproval
description: Gets operator approval for capability and authorization discovery.
---

# getOperatorApproval

Gets operator approval for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getOperatorApproval({
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  operator: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type GetOperatorApprovalParameters = Parameters<typeof sdk.capabilities.getOperatorApproval>[0];
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

### owner

`EthereumAddress`

Address that should own the resulting name or resource.

### operator

`EthereumAddress`

Operator whose approval is read or changed.

## Return Type

```ts
type GetOperatorApprovalResult = Awaited<ReturnType<typeof sdk.capabilities.getOperatorApproval>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getOperatorApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getOperatorApproval.request(parameters);
```

## Action

- [`getOperatorApproval`](/core/api/actions/capabilities/get-operator-approval)
