---
title: getRequiredAuthorization
description: Gets required authorization for capability and authorization discovery.
---

# getRequiredAuthorization

Gets required authorization for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getRequiredAuthorization({
  name: "example.eth",
  account: {},
  operation: {},
});
```

## Parameters

```ts
type GetRequiredAuthorizationParameters = Parameters<
  typeof sdk.capabilities.getRequiredAuthorization
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

### account

`EthereumAddress`

Account used for authorization and execution.

### operation

`WriteOperation`

Value used for `operation` by this method.

## Return Type

```ts
type GetRequiredAuthorizationResult = Awaited<
  ReturnType<typeof sdk.capabilities.getRequiredAuthorization>
>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getRequiredAuthorization.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getRequiredAuthorization.request(parameters);
```

## Action

- [`getRequiredAuthorization`](/core/api/actions/capabilities/get-required-authorization)
