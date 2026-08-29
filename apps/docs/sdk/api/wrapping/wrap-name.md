---
title: wrapName
description: wrap name for wrapped names.
---

# wrapName

wrap name for wrapped names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.wrapping.wrapName({
  name: "example.eth",
  owner: "0x0000000000000000000000000000000000000001",
});
```

## Parameters

```ts
type WrapNameParameters = Parameters<typeof sdk.wrapping.wrapName>[0];
```

### name

`string`

ENS name used by the method. It is normalized before contract interaction.

### owner

`string`

Address that should own the resulting name or resource.

### resolver

`string | undefined`

Resolver address used by the method.

### fuses

`number | ReadonlyArray<NameWrapperFuseName> | undefined`

Value used for `fuses` by this method.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

### resume

`WrapNameResult | undefined`

Previously returned progress used to continue the workflow.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

## Return Type

```ts
type WrapNameResult = Awaited<ReturnType<typeof sdk.wrapping.wrapName>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.wrapping.wrapName.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`wrapName`](/core/api/actions/wrapping/wrap-name)
