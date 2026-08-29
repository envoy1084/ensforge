---
title: importDnsName
description: Runs the resumable DNSSEC proof and ENS import workflow.
---

# importDnsName

Runs the resumable DNSSEC proof and ENS import workflow.

This action belongs to DNSSEC names and DNS resolver records. It selects the supported contract and protocol route from the current configuration and name state.

## Import

```ts
import { importDnsName } from "@ensforge/core";
```

## Usage

```ts
import { importDnsName } from "@ensforge/core";
import { config } from "./config";

const result = await importDnsName(config, {
  name: "example.eth",
  proof: [],
});
```

## Parameters

```ts
type ImportDnsNameParameters = Parameters<typeof importDnsName>[1];
```

### name

`string`

ENS name used by the operation. It is normalized before contract interaction.

### proof

`ReadonlyArray<DnssecProof>`

DNSSEC proof records supplied to the import.

### resolver

`string | undefined`

Resolver address used by the operation.

### address

`string | undefined`

Address used by this operation.

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

### resume

`ImportDnsNameResult | undefined`

Previously returned progress used to continue an incomplete workflow.

## Return Type

```ts
type ImportDnsNameResult = Awaited<ReturnType<typeof importDnsName>>;
```

`ImportDnsNameResult`

## Effect

```ts
const effect = importDnsName.effect(config, parameters);

type Success = Effect.Effect.Success<typeof effect>;
type Failure = Effect.Effect.Error<typeof effect>;
```

## Error

```ts
import type { Effect } from "effect";

type ImportDnsNameError = Effect.Effect.Error<ReturnType<typeof importDnsName.effect>>;
```

See [Error Handling](/core/guides/error-handling) for tagged errors and stable error codes.
