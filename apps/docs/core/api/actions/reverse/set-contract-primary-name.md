---
title: setContractPrimaryName
description: Sets contract primary name for primary-name and reverse resolution.
---

# setContractPrimaryName

Sets contract primary name for primary-name and reverse resolution.

This action belongs to primary-name and reverse resolution. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { setContractPrimaryName } from "@ensforge/core";
```

## Usage

```ts
import { setContractPrimaryName } from "@ensforge/core";
import { config } from "./config";

const result = await setContractPrimaryName(config, {
  contract: "0x0000000000000000000000000000000000000001",
  name: "example.eth",
});
```

## Parameters

```ts
type SetContractPrimaryNameParameters = Parameters<typeof setContractPrimaryName>[1];
```

### contract

`string`

Contract whose reverse name is managed.

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### verifyForward

`boolean | undefined`

Whether a reverse result must resolve forward to the supplied address.

## Return Type

```ts
type SetContractPrimaryNameResult = Awaited<ReturnType<typeof setContractPrimaryName>>;
```

`CallExecutionResult`

## Effect

```ts
const effect = setContractPrimaryName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Call

Use `.call` to prepare a write intent without submitting it.

```ts
const intent = setContractPrimaryName.call(parameters);
```

## Error

```ts
import type { Effect } from "effect";

type SetContractPrimaryNameError = Effect.Effect.Error<
  ReturnType<typeof setContractPrimaryName.effect>
>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
