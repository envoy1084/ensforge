---
title: setContractPrimaryName
description: Sets contract primary name for reverse resolution.
---

# setContractPrimaryName

Sets contract primary name for reverse resolution.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.reverse.setContractPrimaryName({
  contract: "value",
  name: "example.eth",
});
```

## Parameters

```ts
type SetContractPrimaryNameParameters = Parameters<typeof sdk.reverse.setContractPrimaryName>[0];
```

### contract

`string`

Value used for `contract` by this method.

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### verifyForward

`boolean | undefined`

Value used for `verifyForward` by this method.

## Return Type

```ts
type SetContractPrimaryNameResult = Awaited<ReturnType<typeof sdk.reverse.setContractPrimaryName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.reverse.setContractPrimaryName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

The bound method retains `.call` for deferred write composition.

```ts
const intent = sdk.reverse.setContractPrimaryName.call(parameters);
```

## Action

- [`setContractPrimaryName`](/core/api/actions/reverse/set-contract-primary-name)
