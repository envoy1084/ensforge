---
title: getResolverDelegateApproval
description: Gets resolver delegate approval for capability and authorization discovery.
---

# getResolverDelegateApproval

Gets resolver delegate approval for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getResolverDelegateApproval({
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
  delegate: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type GetResolverDelegateApprovalParameters = Parameters<
  typeof sdk.capabilities.getResolverDelegateApproval
>[0];
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

### delegate

`EthereumAddress`

Resolver delegate whose approval or roles are read or changed.

## Return Type

```ts
type GetResolverDelegateApprovalResult = Awaited<
  ReturnType<typeof sdk.capabilities.getResolverDelegateApproval>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getResolverDelegateApproval.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getResolverDelegateApproval.request(parameters);
```

## Action

- [`getResolverDelegateApproval`](/core/api/actions/capabilities/get-resolver-delegate-approval)
