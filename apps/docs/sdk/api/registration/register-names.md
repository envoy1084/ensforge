---
title: registerNames
description: Runs resumable registration workflows for multiple names.
---

# registerNames

Runs resumable registration workflows for multiple names.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.registerNames({
  registrations: [],
});
```

## Parameters

```ts
type RegisterNamesParameters = Parameters<typeof sdk.registration.registerNames>[0];
```

### registrations

`ReadonlyArray<RegisterNamesEntryParameters>`

Registration entries.

### resume

`RegisterNamesResult | undefined`

Previously returned progress used to continue the workflow.

### walletClient

`WalletClient | undefined`

Wallet client override.

### account

`Account | Address | undefined`

Account used for authorization and execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` selects wallet batching when available.

### confirmation

`ConfirmationPolicy | undefined`

Confirmation policy for the write.

## Return Type

```ts
type RegisterNamesResult = Awaited<ReturnType<typeof sdk.registration.registerNames>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.registerNames.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`registerNames`](/core/api/actions/registration/register-names)
