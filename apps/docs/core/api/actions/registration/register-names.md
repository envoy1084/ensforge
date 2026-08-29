---
title: registerNames
description: Runs resumable registration workflows for multiple names.
---

# registerNames

Runs resumable registration workflows for multiple names.

This action belongs to registration and renewal. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { registerNames } from "@ensforge/core";
```

## Usage

```ts
import { registerNames } from "@ensforge/core";
import { config } from "./config";

const result = await registerNames(config, {
  registrations: [],
});
```

## Parameters

```ts
type RegisterNamesParameters = Parameters<typeof registerNames>[1];
```

### registrations

`ReadonlyArray<RegisterNamesEntryParameters>`

Registration entries executed by the batch workflow.

### resume

`RegisterNamesResult | undefined`

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
type RegisterNamesResult = Awaited<ReturnType<typeof registerNames>>;
```

`RegisterNamesResult`

## Effect

```ts
const effect = registerNames.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type RegisterNamesError = Effect.Effect.Error<ReturnType<typeof registerNames.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
