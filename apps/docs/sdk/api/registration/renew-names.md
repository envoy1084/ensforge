---
title: renewNames
description: Renews multiple names with batching and resumable progress.
---

# renewNames

Renews multiple names with batching and resumable progress.

## Import

```ts
import { Ensforge } from "@ensforge/sdk";
```

## Usage

```ts
import { sdk } from "./sdk";

const result = await sdk.registration.renewNames({
  renewals: [],
});
```

## Parameters

```ts
type RenewNamesParameters = Parameters<typeof sdk.registration.renewNames>[0];
```

### renewals

`ReadonlyArray<RenewNamesEntryParameters>`

Renewal entries.

### maxTotalPrice

`bigint | undefined`

Maximum aggregate price accepted by the caller.

### resume

`RenewNamesResult | undefined`

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
type RenewNamesResult = Awaited<ReturnType<typeof sdk.registration.renewNames>>;
```

The result is identical to the corresponding Core action with configuration already bound.

## Effect

```ts
const effect = sdk.registration.renewNames.effect(parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Action

- [`renewNames`](/core/api/actions/registration/renew-names)
