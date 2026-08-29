---
title: renewNames
description: Renews multiple names with safe batching and resumable progress.
---

# renewNames

Renews multiple names with safe batching and resumable progress.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { renewNames } from "@ensforge/core";
```

## Usage

```ts
import { renewNames } from "@ensforge/core";
import { config } from "./config";

const result = await renewNames(config, {
  renewals: [],
});
```

## Parameters

```ts
type RenewNamesParameters = Parameters<typeof renewNames>[1];
```

### renewals

`ReadonlyArray<RenewNamesEntryParameters>`

Renewal entries executed by the batch workflow.

### maxTotalPrice

`bigint | undefined`

Maximum aggregate price accepted by the caller.

### resume

`RenewNamesResult | undefined`

Previously returned progress used to continue an incomplete workflow.

### walletClient

`WalletClient | undefined`

Wallet client override for this operation.

### account

`Account | Address | undefined`

Account used for authorization and wallet execution.

### mode

`WriteMode | undefined`

Execution mode. `auto` uses wallet capabilities and falls back safely.

### confirmation

`ConfirmationPolicy | undefined`

Transaction confirmation policy for this operation.

## Return Type

```ts
type RenewNamesResult = Awaited<ReturnType<typeof renewNames>>;
```

`RenewNamesResult`

## Effect

```ts
const effect = renewNames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type RenewNamesError = Effect.Effect.Error<ReturnType<typeof renewNames.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
