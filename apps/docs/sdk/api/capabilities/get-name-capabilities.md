---
title: getNameCapabilities
description: Gets name capabilities for capability and authorization discovery.
---

# getNameCapabilities

Gets name capabilities for capability and authorization discovery.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.capabilities.getNameCapabilities({
  name: "example.eth",
  account: {},
});
```

## Parameters

```ts
type GetNameCapabilitiesParameters = Parameters<typeof sdk.capabilities.getNameCapabilities>[0];
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

### records

`ReadonlyArray<RecordOperation> | undefined`

Records selected, read, or written.

## Return Type

```ts
type GetNameCapabilitiesResult = Awaited<ReturnType<typeof sdk.capabilities.getNameCapabilities>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.capabilities.getNameCapabilities.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Request

The bound method retains `.request` for typed read batching.

```ts
const request = sdk.capabilities.getNameCapabilities.request(parameters);
```

## Action

- [`getNameCapabilities`](/core/api/actions/capabilities/get-name-capabilities)
